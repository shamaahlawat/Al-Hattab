import { statuses } from '../../config/constants';

const main_company = {
    name: "Al-Hattab",
    description: "Al-Hattab Group, is a close-knit multifaceted enterprise of dynamic and rapidly progressive business group.\r\nStrategy | Innovation | Commitment | Excellence",
    tagline: "Make Your Dream Happen",
    logo: "http://res.cloudinary.com/poletalks/image/upload/v1524125374/s32syhw2unzu20vinv67.png",
    background_color: "#9a2c78",
    address: "Doha – Qatar\r\nTel: +974 44775848\r\nFax: +974 44775849\r\nC.R No: 3932, \r\nPO Box: 4810",
    location: {
        id: 1,
        latitude: 25.285447,
        longitude: 51.53104,
        name: "Doha"
    },
    company_sliders: [],
    about_us: [],
    team: [],
    clients: [],
    news: [],
    events: [],
    gallery: []
};

const main_company_details = localStorage.getItem('main_company_details') ? JSON.parse(localStorage.getItem('main_company_details')) : main_company;
const main_company_companies = localStorage.getItem('main_company_companies') ? JSON.parse(localStorage.getItem('main_company_companies')) : main_company;

const states = {
    company_details: {
        main_company: {
            company_details: main_company_details,
            companies: main_company_companies
        },
        sub_company: undefined,
        loaders: {
            get_company_details: statuses.LOADING,
            get_subcompany_details: statuses.LOADING
        }
    }
};

export default states;
