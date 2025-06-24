interface serviceInterface {
    id: string;
    title: string;
    subTitle: string;
    banner: string;
    image: string;
    description?: string;
    
}

const services: serviceInterface[] = [
    {
        id: 'crm',
        title: 'Transform Your Business with CRM',
        subTitle: 'Unlock the power of customer relationships with Jaikvik Technology',
        banner: 'https://plus.unsplash.com/premium_photo-1733306696471-807493ff845b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q1JNfGVufDB8fDB8fHww',
        image: 'https://img.freepik.com/free-vector/flat-design-crm-illustration_23-2149364431.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740'

    }
]

export default services;