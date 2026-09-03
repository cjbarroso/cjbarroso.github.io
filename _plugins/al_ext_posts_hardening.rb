# frozen_string_literal: true

# Hardening for al_ext_posts: never let a failed external fetch abort the build.
#
# Upstream (al_ext_posts 1.0.3) fixed the `nil` title crash we hit in 6e9ba95, but
# `fetch_content_from_url` still calls `HTTParty.get(url).body` unguarded, so a
# non-200 response, an empty body, or a connection error takes down `jekyll build`
# and with it the whole deploy. These posts live on third-party sites we do not
# control, so an outage there must not stop us from publishing.
#
# `generate` runs on every build (there is no production-only guard), so the
# response is parsed here rather than delegating to `super` — calling `super`
# after the check would issue a second HTTP request for every external post.
# The parsing below mirrors al_ext_posts 1.0.3; revisit it when that gem changes.
# Drop this file entirely once upstream guards the request itself.
require 'al_ext_posts'

module AlExtPostsHardening
  def fetch_from_urls(site, src)
    src['posts'].each do |post|
      puts "...fetching #{post['url']}"
      content = fetch_content_from_url(post['url'])
      if content.nil?
        Jekyll.logger.warn 'ExternalPosts:', "skipping #{post['url']}, could not fetch content"
        next
      end
      content[:published] = parse_published_date(post['published_date'])
      create_document(site, src['name'], post['url'], content, metadata_for_post(src, post))
    end
  end

  def fetch_content_from_url(url)
    response = HTTParty.get(url)
    unless response.success?
      Jekyll.logger.warn 'ExternalPosts:', "#{url} returned HTTP #{response.code}"
      return nil
    end

    html = response.body
    if html.nil? || html.empty?
      Jekyll.logger.warn 'ExternalPosts:', "#{url} returned an empty body"
      return nil
    end

    parsed_html = Nokogiri::HTML(html)

    title = parsed_html.at('head title')&.text&.strip || ''

    description = parsed_html.at('head meta[name="description"]')&.attr('content')
    description ||= parsed_html.at('head meta[name="og:description"]')&.attr('content')
    description ||= parsed_html.at('head meta[property="og:description"]')&.attr('content')

    body_content = parsed_html.search('p').map(&:text).join

    { title: title, content: body_content, summary: description }
  rescue StandardError => e
    Jekyll.logger.warn 'ExternalPosts:', "error fetching #{url} - #{e.message}"
    nil
  end

  def fetch_from_rss(site, src)
    super
  rescue StandardError => e
    Jekyll.logger.warn 'ExternalPosts:', "error fetching #{src['rss_url']} - #{e.message}"
    nil
  end
end

AlExtPosts::ExternalPostsGenerator.prepend(AlExtPostsHardening)
