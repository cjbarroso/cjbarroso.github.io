# frozen_string_literal: true

# De-duplicate cross-posted external articles.
#
# al_ext_posts derives a post's slug from its title alone, so the same article
# published to Medium, Blogger and LinkedIn produces three documents writing to
# one path. Jekyll warns ("destination is shared by multiple files") and the
# winner is whichever source happened to be processed last.
#
# Here the FIRST source in `external_sources` wins and later copies are skipped,
# so the config order encodes the preference — keep medium.com first to prefer
# the Medium copy. Sources still keep their RSS feeds, so new posts on any
# platform are picked up automatically; only same-title repeats are dropped.
require 'al_ext_posts'

module AlExtPostsDedupe
  def generate(site)
    @seen_slugs = {}
    super
  end

  def create_document(site, source_name, url, content, src = {})
    @seen_slugs ||= {}
    slug = build_slug(source_name, url, content[:title])

    if (winner = @seen_slugs[slug])
      Jekyll.logger.info 'ExternalPosts:', "skipping #{url}, already published from #{winner}"
      return
    end

    @seen_slugs[slug] = source_name
    super
  end
end

AlExtPosts::ExternalPostsGenerator.prepend(AlExtPostsDedupe)
