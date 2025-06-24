import type serviceInterface from "../interfaces/serviceInterface";

const services: serviceInterface[] = [
    {
        badge: 'Popular',
        mainImg: 'https://images.unsplash.com/photo-1630442923896-244dd3717b35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TW9iaWxlJTIwQXBwJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
        galleryImgs: [
            { src: 'https://plus.unsplash.com/premium_photo-1721080250995-5a83519eb2a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TW9iaWxlJTIwQXBwJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D', alt: 'Mobile App Gallery 1' },
            { src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1vYmlsZSUyMEFwcCUyMERldmVsb3BtZW50fGVufDB8fDB8fHww', alt: 'Mobile App Gallery 2' },
            { src: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1vYmlsZSUyMEFwcCUyMERldmVsb3BtZW50fGVufDB8fDB8fHww', alt: 'Mobile App Gallery 3' },
        ],
        title: 'Mobile App Development',
        description: 'Custom native and cross-platform mobile applications for iOS and Android platforms.',
        link: 'mobile-application.php',
    },
    {
        badge: 'Featured',
        mainImg: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2ViJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
        galleryImgs: [
            { src: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2ViJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D', alt: 'Web Development Gallery 1' },
            { src: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdlYiUyMERldmVsb3BtZW50fGVufDB8fDB8fHww', alt: 'Web Development Gallery 2' },
            { src: 'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFdlYiUyMERldmVsb3BtZW50fGVufDB8fDB8fHww', alt: 'Web Development Gallery 3' },
        ],
        title: 'Web Development',
        description: 'Responsive, high-performance websites and web applications with modern technologies.',
        link: 'website-development-page.php',
    },
    {
        mainImg: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VUklMkZVWCUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
        galleryImgs: [
            { src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFVJJTJGVVglMjBEZXNpZ258ZW58MHx8MHx8fDA%3D', alt: 'Film Production Gallery 1' },
            { src: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFVJJTJGVVglMjBEZXNpZ258ZW58MHx8MHx8fDA%3D', alt: 'Film Production Gallery 2' },
            { src: 'https://images.unsplash.com/photo-1586717799252-bd134ad00779?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFVJJTJGVVglMjBEZXNpZ258ZW58MHx8MHx8fDA%3D', alt: 'Film Production Gallery 3' },
        ],
        title: 'Film Production',
        description: 'Crafting compelling visual stories through creative direction, professional cinematography, and seamless editing.',
        link: 'Film_production.php',
    },
    {
        badge: 'Hot',
        mainImg: 'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RSUyMGNvbW1lcmNlJTIwU29sdXRpb25zfGVufDB8fDB8fHww',
        galleryImgs: [
            { src: 'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEUlMjBjb21tZXJjZSUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D', alt: 'E-commerce Gallery 1' },
            { src: 'https://plus.unsplash.com/premium_photo-1661456268709-bac8e7f21e51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEUlMjBjb21tZXJjZSUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D', alt: 'E-commerce Gallery 2' },
            { src: 'https://images.unsplash.com/photo-1726138383736-3c848a2c7769?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEUlMjBjb21tZXJjZSUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D', alt: 'E-commerce Gallery 3' },
        ],
        title: 'E-commerce Solutions',
        description: 'Complete online store solutions with secure payment gateways and inventory management.',
        link: 'website-development-page.php',
    },
    {
        mainImg: 'https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xvdWQlMjBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D',
        galleryImgs: [
            { src: 'https://plus.unsplash.com/premium_photo-1683836722608-60ab4d1b58e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2xvdWQlMjBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D', alt: 'Cloud Services Gallery 1' },
            { src: 'https://plus.unsplash.com/premium_photo-1681487942927-e1a2786e6036?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2xvdWQlTIyBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D', alt: 'Cloud Services Gallery 2' },
            { src: 'https://plus.unsplash.com/premium_photo-1683288706548-e8b6bb72fe86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fENsb3VkJTIwU2VydmljZXN8ZW58MHx8MHx8fDA%3D', alt: 'Cloud Services Gallery 3' },
        ],
        title: 'Cloud Services',
        description: 'Scalable cloud infrastructure, migration, and management solutions for your business.',
        link: 'Customized_Software.php',
    },
    {
        badge: 'New',
        mainImg: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGlnaXRhbCUyME1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D',
        galleryImgs: [
            { src: 'https://images.unsplash.com/photo-1537731121640-29c85a43dcfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fERpZ2l0YWwlMjBNYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D', alt: 'Digital Marketing Gallery 1' },
            { src: 'https://plus.unsplash.com/premium_photo-1683262038148-2ac280407276?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fERpZ2l0YWwlMjBNYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D', alt: 'Digital Marketing Gallery 2' },
            { src: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fERpZ2l0YWwlMjBNYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D', alt: 'Digital Marketing Gallery 3' },
        ],
        title: 'Digital Marketing',
        description: 'Strategic SEO, targeted PPC campaigns, and impactful social media marketing to increase visibility, drive traffic, and grow your brand online.',
        link: 'digital-marketing.php',
    },
    {
        mainImg: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D',
        galleryImgs: [
            { src: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Ads Gallery 1' },
            { src: 'https://plus.unsplash.com/premium_photo-1674669009418-2643aa58b11b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Ads Gallery 2' },
            { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Ads Gallery 3' },
        ],
        title: 'PPC, Meta, YouTube Ads',
        description: 'Data-driven ad strategies across Google, Meta, and YouTube to maximize ROI, increase conversions, and reach your target audience effectively.',
        link: 'PPC-Meta-YouTube-Ads.php',
    },
    {
        badge: 'Trending',
        mainImg: 'https://plus.unsplash.com/premium_photo-1726666269043-fb16e54646d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QUklMjBTb2x1dGlvbnN8ZW58MHx8MHx8fDA%3D',
        galleryImgs: [
            { src: 'https://plus.unsplash.com/premium_photo-1661727567905-01e580328c2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUklMjBTb2x1dGlvbnN8ZW58MHx8MHx8fDA%3D', alt: 'Social Media Gallery 1' },
            { src: 'https://images.unsplash.com/photo-1738003667850-a2fb736e31b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QUklMjBTb2x1dGlvbnN8ZW58MHx8MHx8fDA%3D', alt: 'Social Media Gallery 2' },
            { src: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWl8ZW58MHx8MHx8fDA%3D', alt: 'Social Media Gallery 3' },
        ],
        title: 'Social Media',
        description: 'Engaging content strategies, community management, and platform-specific campaigns to grow your brand and connect with your audience.',
        link: 'social-media-page.php',
    },
];

export default services;