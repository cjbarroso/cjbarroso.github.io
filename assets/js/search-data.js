// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-writeups",
          title: "Writeups",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-git",
          title: "Git",
          description: "My most important github repositories",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-talks-and-conferences",
          title: "Talks and Conferences",
          description: "Mainly talks I&#39;ve given but also some of my involvement in community events",
          section: "Navigation",
          handler: () => {
            window.location.href = "/talks/";
          },
        },{id: "post-aws-community-builders-2025-your-launchpad-to-cloud-success",
      
        title: "AWS Community Builders 2025 - Your Launchpad to Cloud Success",
      
      description: "Thinking about diving into the AWS cloud? Or maybe you&#39;re already there and want to level up your game? Look no further than the AWS Community Builders program!",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/new-year-new-community-builders/";
        
      },
    },{id: "post-awsomeness-2024-my-re-invent-2024-highlights",
      
        title: "AWSomeness 2024 - My re:Invent 2024 highlights",
      
      description: "What I learnt about the future of the world of data and AI from re:Invent 2024",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/awsomeness-2024-my-re-invent-2024-experience/";
        
      },
    },{id: "post-my-twitter-x-posts",
      
        title: "My twitter/X posts",
      
      description: "My X feed",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/twitter/";
        
      },
    },{id: "post-ai-beyond-science-fiction-a-look-at-its-gradual-takeover",
      
        title: 'AI: Beyond Science Fiction - A Look at Its Gradual Takeover <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "From finance to healthcare, AI is revolutionizing every aspect of our lives. Learn how AI can benefit you and unlock its potential to transform your world.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/the-rise-of-ia-and-its-inescapable-transformation", "_blank");
        
      },
    },{id: "post-don-39-t-lose-clients-in-onboarding-hell-a-fintech-case-study-in-ai-powered-efficiency",
      
        title: 'Don&#39;t Lose Clients in Onboarding Hell: A Fintech Case Study in AI-powered Efficiency... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Learn how a leading Fintech company used AI and cloud technology to streamline onboarding, reduce errors, and gain a competitive edge.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/teracloud-boosts-fintech-client-onboarding-with-cloud-and-ai", "_blank");
        
      },
    },{id: "post-the-age-of-ia-is-here-and-your-infrastructure-is-not-ready",
      
        title: 'The age of IA is here - and your infrastructure is not ready... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2023/11/the-age-of-ia-is-here-and-your.html", "_blank");
        
      },
    },{id: "post-essential-insights-for-c-level-executives-navigating-it-in-the-age-of-ai",
      
        title: 'Essential Insights for C-Level Executives: Navigating IT in the Age of AI <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Learn essential steps to prepare your organization for the AI revolution. Explore practical strategies and recommendations to integrate AI seamlessly and drive business success.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/what-c-levels-must-know-about-their-it-in-the-age-of-ai", "_blank");
        
      },
    },{id: "post-simplify-codecommit-authentication",
      
        title: 'Simplify CodeCommit Authentication <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Discover the power of AWS Session Manager for simplified remote work. Enhance security, manage access, and track actions for improved efficiency and peace of mind.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/easy-codecommit-authentication-with-git-remote-codecommit", "_blank");
        
      },
    },{id: "post-cybersecurity-awareness-phishing-prevention",
      
        title: 'Cybersecurity Awareness: Phishing Prevention <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Elevate your cybersecurity awareness with practical tips to prevent falling victim to phishing scams. Take charge of your online safety during Cybersecurity Month and equip yourself with the knowledge needed to recognize and thwart phishing attempts effectively.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/cybersecurity-month-tips-to-avoid-being-phished", "_blank");
        
      },
    },{id: "post-the-art-of-data-management-aws-data-pipelines",
      
        title: 'The Art of Data Management: AWS Data Pipelines <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Discover the art of managing data effectively on AWS through robust data pipeline architectures. Gain insights into capture, ingestion, transformation, storage, and value extraction stages, empowering you to harness the full potential of your data assets.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/data-fundamentals-on-aws-data-pipelines", "_blank");
        
      },
    },{id: "post-terraform-workspaces-with-direnv-amp-dotenv-maintain-sanity-in-multi-environment-setups",
      
        title: 'Terraform Workspaces with direnv &amp; dotenv: Maintain Sanity in Multi-Environment Setups <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Simplify complex Terraform workspace management! This guide explores how to leverage direnv and dotenv to keep your sanity intact when working with multiple environments.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/terraform-workspaces-direnv-dotenv-and-mental-sanity", "_blank");
        
      },
    },{id: "post-direnv-demystified-advanced-tip-for-devops",
      
        title: 'Direnv Demystified: Advanced Tip for DevOps <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Demystify Direnv and take your DevOps skills to the next level. Unlock the secrets of advanced Direnv usage, including dynamic environment management and tailored deployments. Stay ahead of the curve with our exclusive insights and optimize your workflow for enhanced agility and effectiveness.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/advanced-direnv-for-devops", "_blank");
        
      },
    },{id: "post-unlock-devops-efficiency-with-direnv",
      
        title: 'Unlock DevOps Efficiency with Direnv <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Unlock unparalleled DevOps efficiency with Direnv. Seamlessly switch environments with .envrc files. Elevate your workflow securely.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/direnv-for-devops", "_blank");
        
      },
    },{id: "post-leverage-gcloud-service-accounts-within-terraform-for-secure-infrastructure-management",
      
        title: 'Leverage GCloud Service Accounts within Terraform for Secure Infrastructure Management <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Enhance your Terraform security! This guide explores how to integrate GCloud service accounts for secure and controlled infrastructure provisioning.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/using-gcloud-service-accounts-in-terraform", "_blank");
        
      },
    },{id: "post-boost-gcp-security-secure-gcloud-cli-access-with-service-accounts",
      
        title: 'Boost GCP Security: Secure GCloud CLI Access with Service Accounts <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Enhance your GCP security! This guide explains how to leverage service accounts to restrict access to the GCloud CLI and minimize administrative burdens.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/secure-your-access-to-gcloud-cli-with-service-accounts", "_blank");
        
      },
    },{id: "post-secure-your-database-aurora-mysql-encryption",
      
        title: 'Secure Your Database: Aurora MySQL Encryption <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Strengthen the security of your Aurora MySQL database by encrypting it with AWS KMS, employing binlog replication for a smooth encryption process with minimal downtime.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/existing-aurora-mysql-cluster-encryption-at-rest-from-zero-to-kms", "_blank");
        
      },
    },{id: "post-automation-friend-or-foe-how-automation-will-reshape-the-future-of-work",
      
        title: 'Automation: Friend or Foe? How Automation Will Reshape the Future of Work <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Is automation a job threat? This guide explores the impact of automation on the workforce and highlights the new skills needed to thrive in the future.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/will-the-automation-stole-your-job-or-secure-your-future", "_blank");
        
      },
    },{id: "post-the-impact-of-big-data-in-the-cloud-shaping-the-future-of-businesses",
      
        title: 'The Impact of Big Data in the Cloud: Shaping the Future of Businesses... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Unlock the power of big data! This guide explores how cloud-based big data solutions empower businesses with actionable insights to drive future growth.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/the-power-of-big-data-in-the-cloud-and-its-effects-on-the-future-of-companies", "_blank");
        
      },
    },{id: "post-marketing-conversacional-y-chatbots-un-matrimonio-perfecto",
      
        title: 'Marketing conversacional y chatbots: un matrimonio perfecto <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/marketing-conversacional-y-chatbots-matrimonio-perfecto-fdfa48b6d022?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-chatbots-un-activo-invaluable-para-las-pymes",
      
        title: 'Chatbots: un activo invaluable para las PyMEs <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/chatbots-activo-invaluable-para-pymes-465e1d21e568?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-chatbots-un-activo-invaluable-para-las-pymes",
      
        title: 'Chatbots: un activo invaluable para las PyMEs <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2018/10/chatbots-un-activo-invaluable-para-las.html", "_blank");
        
      },
    },{id: "post-chatbots-un-activo-invaluable-para-las-pymes",
      
        title: 'Chatbots: un activo invaluable para las PyMEs <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Todos los días vemos en las noticias que empresas relacionadas con Inteligencia Artificial se venden por millones de dólares. Esa realidad parece estar muy lejana de nuestras PyMEs, que creen estar a años de poder beneficiarse de las nuevas tecnologías.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.linkedin.com/pulse/chatbots-un-activo-invaluable-para-las-pymes-carlos-barroso/", "_blank");
        
      },
    },{id: "post-como-bajamos-30-los-costos-de-atención-al-cliente",
      
        title: 'Como bajamos 30% los costos de atención al cliente <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/como-bajamos-30-los-costos-de-atenci%C3%B3n-al-cliente-cff0d6f6b739?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-como-bajamos-30-los-costos-de-atención-al-cliente",
      
        title: 'Como bajamos 30% los costos de atención al cliente <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "¿Es posible bajar los costos de atención al cliente y, al mismo tiempo, mejorar la calidad de atención? Claro que sí. La respuesta viene de la mano de la innovación, la tecnología, y la Inteligencia Artificial.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.linkedin.com/pulse/como-bajamos-30-los-costos-de-atenci%25C3%25B3n-al-cliente-carlos-barroso/", "_blank");
        
      },
    },{id: "post-por-qué-pydata",
      
        title: '¿Por qué PyData? <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2018/09/por-que-pydata.html", "_blank");
        
      },
    },{id: "post-por-qué-pydata",
      
        title: '¿Por qué PyData? <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "Porque no existe otro evento que reúna bajo el mismo techo a lo mejor de la academia, la ciencia y los negocios alrededor de Ciencias de Datos y Machine Learning. Esto debería bastar para convencerte, apurate a inscribirte aquí, y si querés mas información sobre el lugar y como llegar, mirá este enl",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.linkedin.com/pulse/por-qu%25C3%25A9-pydata-carlos-barroso/", "_blank");
        
      },
    },{id: "post-que-es-autokeras-y-por-que-es-un-paso-en-la-dirección-correcta",
      
        title: 'Que es autokeras y por que es un paso en la dirección correcta... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/que-es-autokeras-y-por-que-es-un-paso-en-la-direcci%C3%B3n-correcta-2ceb6ace8306?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-serie-introducción-a-la-inteligencia-artificial-con-aws",
      
        title: 'Serie: Introducción a la inteligencia artificial con AWS <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/serie-introducci%C3%B3n-a-la-inteligencia-artificial-con-aws-301878174b59?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-serie-introducción-a-la-inteligencia-artificial-con-aws",
      
        title: 'Serie: Introducción a la inteligencia artificial con AWS <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2018/08/serie-introduccion-inteligencia.html", "_blank");
        
      },
    },{id: "post-intro-to-ai-with-aws",
      
        title: 'Intro to #AI with AWS <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "When you read this, Amazon will have taken out of the market to 200 data scientists per day with an update to its Machine Learning platform. Ok, I made up that number, but I think is really close to the truth.",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.linkedin.com/pulse/intro-ai-aws-carlos-barroso/", "_blank");
        
      },
    },{id: "post-intro-to-artificial-intelligence-ai-on-aws",
      
        title: 'Intro to Artificial Intelligence(AI) on AWS <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "When you read this, Amazon will have taken out of the market to 200 data scientists per day with an update to its Machine Learning platform. Ok, I made up that",
      section: "Posts",
      handler: () => {
        
          window.open("https://www.teracloud.io/single-post/2018/08/01/intro-to-artificial-intelligenceai-on-aws", "_blank");
        
      },
    },{id: "post-inteligencia-artificial-el-mundial-y-la-maldición-de-argentina",
      
        title: 'Inteligencia Artificial, el mundial y la maldición de Argentina <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2018/06/inteligencia-artificial-el-mundial-y-la.html", "_blank");
        
      },
    },{id: "post-qué-país-va-a-ganar-el-mundial-la-inteligencia-artificial-dio-su-veredicto",
      
        title: '¿Qué país va a ganar el Mundial? La Inteligencia Artificial dio su veredicto... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://accesibilia.blogspot.com/2018/06/que-pais-va-ganar-el-mundial-la.html", "_blank");
        
      },
    },{id: "post-qué-país-va-a-ganar-el-mundial-la-inteligencia-artificial-dio-su-veredicto",
      
        title: '¿Qué país va a ganar el Mundial? La Inteligencia Artificial dio su veredicto... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/qu%C3%A9-pa%C3%ADs-va-a-ganar-el-mundial-la-inteligencia-artificial-dio-su-veredicto-b5633c001a0?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "post-inteligencia-artificial-el-mundial-y-la-maldición-de-argentina",
      
        title: 'Inteligencia Artificial, el mundial y la maldición de Argentina <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@carlosjosebarroso/inteligencia-artificial-el-mundial-y-la-maldici%C3%B3n-de-argentina-9d71041994ae?source=rss-de342e7629f8------2", "_blank");
        
      },
    },{id: "news-on-my-way-to-re-invent-2024-see-you-there",
          title: 'On my way to re:Invent 2024! See you there!',
          description: "",
          section: "News",},{id: "news-back-from-re-invent-shocked",
          title: 'Back from re:Invent... shocked',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-i-m-out-for-vacation-with-the-family-until-jan-6th-not-that-jan-6th-barack",
          title: 'I’m out for vacation with the family until Jan 6th (not THAT Jan...',
          description: "",
          section: "News",},{id: "news-i-m-back-with-tons-of-projects-and-ideas-for-2025",
          title: 'I’m back with TONS of projects and ideas for 2025',
          description: "",
          section: "News",},{id: "news-apply-to-be-an-aws-community-builder-here",
          title: 'Apply to be an AWS Community Builder here!',
          description: "",
          section: "News",},{id: "news-my-webinar-in-spanish-for-data-modernization-and-data-maturity-model-video",
          title: 'My webinar (in spanish) for data modernization and data maturity model: video',
          description: "",
          section: "News",},{id: "projects-1",
          title: '1',
          description: "Quantified Self",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-agents-self-discovery",
          title: 'Agents self-discovery',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "talks-fitga-apr-2024-santiago-cl",
          title: 'FITGA Apr 2024 - Santiago, CL',
          description: "My FITGA talk in AWS&#39;s offices in Santiago, Chile",
          section: "Talks",handler: () => {
              window.location.href = "/talks/abr-santiago-2024/";
            },},{id: "talks-aws-genai-fast-track-sf-ca-usa",
          title: 'AWS GenAI Fast Track, SF, CA, USA',
          description: "Work week with customers in AWS San Francisco Bay Area offices 24th apr, 2025",
          section: "Talks",handler: () => {
              window.location.href = "/talks/abr-sf-2025/";
            },},{id: "talks-fitga-aug-2024-bs-as-ar",
          title: 'FITGA Aug 2024 - Bs As, AR',
          description: "My FITGA talk in AWS&#39;s offices in Buenos Aires, Argentina, on Aug 2nd, 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/bsas-ago-2024/";
            },},{id: "talks-madura-tus-datos-con-ia-bs-as-ar",
          title: 'Madura tus datos con IA - Bs As, AR',
          description: "Mi charla sobre madurez de dato en las oficinas de AWS Buenos Aires, Argentina, 4 de junio de 2025",
          section: "Talks",handler: () => {
              window.location.href = "/talks/bsas-jun-2025/";
            },},{id: "talks-cloud-experience-mar-2024-bsas-ar",
          title: 'Cloud eXPerience - Mar 2024 - BsAs, AR',
          description: "Our experience in the CLoud eXPerience in Buenos Aires, March 13th 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/bsas-mar-2024/";
            },},{id: "talks-fitga-oct-2024-bs-as-ar",
          title: 'FITGA Oct 2024 - Bs As, AR',
          description: "My FITGA talk in AWS&#39;s offices in Buenos Aires, Argentina on Oct 3rd, 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/bsas-oct-2024/";
            },},{id: "talks-aws-community-day-2024",
          title: 'AWS Community Day 2024',
          description: "As part of the organizer team and speaker I was in the AWS Community Day 2024 in Buenos Aires",
          section: "Talks",handler: () => {
              window.location.href = "/talks/bsas-sept-comm-day/";
            },},{id: "talks-fitga-nov-2024-cba-ar",
          title: 'FITGA Nov 2024 - Cba, AR',
          description: "My FITGA talk in Teracloud&#39;s offices in Cordoba, Argentina on Nov 13th 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/cba-teracloud-2024/";
            },},{id: "talks-america-digital-2024-mx",
          title: 'America Digital 2024, MX',
          description: "Our participation on America Digital 2024 in Ciudad de Mexico, MX on Jun 19-20, 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/cdmx-am-dig-jun-24/";
            },},{id: "talks-fitga-jun-2024-cdmx-mx",
          title: 'FITGA Jun 2024 - CDMX, MX',
          description: "My FITGA talk in AWS&#39;s offices in Ciudad de Mexico, MX on Jun 21st, 2024",
          section: "Talks",handler: () => {
              window.location.href = "/talks/cdmx-fitga-jun-24/";
            },},{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/724996266463068271", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%61%72%6C%6F%73@%63%6A%62%61%72%72%6F%73%6F.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/cjbarroso", "_blank");
        },
      },{
        id: 'social-gitlab',
        title: 'GitLab',
        section: 'Socials',
        handler: () => {
          window.open("https://gitlab.com/cjbarroso", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/carlosjosebarroso", "_blank");
        },
      },{
        id: 'social-keybase',
        title: 'Keybase',
        section: 'Socials',
        handler: () => {
          window.open("https://keybase.io/cjbarroso", "_blank");
        },
      },{
        id: 'social-lastfm',
        title: 'Last FM',
        section: 'Socials',
        handler: () => {
          window.open("https://www.last.fm/user/cjbarroso", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/cjbarroso", "_blank");
        },
      },{
        id: 'social-medium',
        title: 'Medium',
        section: 'Socials',
        handler: () => {
          window.open("https://medium.com/@carlosjosebarroso", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-telegram',
        title: 'telegram',
        section: 'Socials',
        handler: () => {
          window.open("https://telegram.me/cjbarroso", "_blank");
        },
      },{
        id: 'social-wikipedia',
        title: 'Wikipedia',
        section: 'Socials',
        handler: () => {
          window.open("https://wikipedia.org/wiki/User:Cjbarroso", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://www.teracloud.io", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/cjbarroso", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
