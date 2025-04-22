// const API = "https://52.221.196.157";
const API = "http://127.0.0.1:8000";
const API_BASEURL = `${API}/api`;

const API_ENDPOINTS = {

    // images
    getImages: `${API_BASEURL}/images`,

    // event
    getEvent: `${API_BASEURL}/event`,

    // menu
    getMenu: `${API_BASEURL}/menu`,

    // page
    getPage: `${API_BASEURL}/page`,

    // news
    getNews: `${API_BASEURL}/news`,

    // banner
    getBanner: `${API_BASEURL}/banner`,

    // academic
    getAcademic: `${API_BASEURL}/academic`,

    // headersection
    getHeaderSection: `${API_BASEURL}/headersection`,

    // intro (introduction)
    getIntroduction: `${API_BASEURL}/intro`,

    // idd (important)
    getImportant: `${API_BASEURL}/idd`,

    // department
    getDepartment: `${API_BASEURL}/department`,

    // faq
    getFAQ: `${API_BASEURL}/faq`,

    // apd (available)
    getAvailable: `${API_BASEURL}/apd`,

    // ha (apply)
    getApply: `${API_BASEURL}/ha`,

    // ufcsd (future)
    getFuture: `${API_BASEURL}/ufcsd`,

    // umd (unlock)
    getUnlock: `${API_BASEURL}/umd`,

    // fee
    getFee: `${API_BASEURL}/fee`,

    // study-degree (study)
    getStudy: `${API_BASEURL}/study-degree`,

    // gc(criteria)
    getCriteria: `${API_BASEURL}/gc`,

    // rason(Add On of CSD)
    getAddOnCSD: `${API_BASEURL}/rason`,

    // information
    getText: `${API_BASEURL}/text`,

    // testimonial
    getTestimonial: `${API_BASEURL}/testimonial`,

    // gallery
    getGallery: `${API_BASEURL}/gallery`,

    // gcaddon (subrequirement)
    getSubRequirement: `${API_BASEURL}/gcaddon`,

    // acad-facilities(facilities)
    getAcadFacilities: `${API_BASEURL}/acad-facilities`,

    // ras(specialization)
    getSpecialization: `${API_BASEURL}/ras`,

    // tse(type)
    getType: `${API_BASEURL}/tse`,

    // subtse(subtype)
    getSubType: `${API_BASEURL}/subtse`,

    // subidd(subimportant)
    getSubImportant: `${API_BASEURL}/subidd`,

    // subha(subapply)
    getSubApply: `${API_BASEURL}/subha`,

    // faqaddon(subFAQ)
    getSubFAQ: `${API_BASEURL}/faqaddon`,

    // ufaddon(subfuture)
    getSubFuture: `${API_BASEURL}/ufaddon`,

    // subapd(subavailable)
    getSubAvailable: `${API_BASEURL}/subapd`,

    // year(sub studydegree)
    getSubStudyDegree: `${API_BASEURL}/year`,

    // subservice
    getSubserviceAF: `${API_BASEURL}/subservice`,

    // slideshow
    getSlideshow: `${API_BASEURL}/slideshow`,

    // service
    getService: `${API_BASEURL}/service`,

    // btnss
    getBtnss: `${API_BASEURL}/btnss`,

    // section
    getSection: `${API_BASEURL}/section`,
    getSectionByPage: `${API_BASEURL}/section/by-page`,

    // faculty
    getFaculty: `${API_BASEURL}/faculty`,

    // faculty-contact
    getFacultyContact: `${API_BASEURL}/faculty-contact`,
    getFacultyContactByFaculty: `${API_BASEURL}/faculty-contact/by-faculty`,

    // faculty-bg
    getFacultyBG: `${API_BASEURL}/faculty-bg`,
    getFacultyBGByFaculty: `${API_BASEURL}/faculty-bg/by-faculty`,

    // faculty-info
    getFacultyInfo: `${API_BASEURL}/faculty-info`,

    // social
    getSocial: `${API_BASEURL}/social`,

    // career
    getCareer: `${API_BASEURL}/career`,

    // feedback
    getScholarship: `${API_BASEURL}/scholarship`,

    // research
    getResearch: `${API_BASEURL}/rsd`,

    // researchlab
    getResearchlab: `${API_BASEURL}/rsdl`,

    //rsdltag
    getResearchlabTag: `${API_BASEURL}/rsdltag`,

    // feedback
    getFeedback: `${API_BASEURL}/feedback`,

    // partnership
    getPartnership: `${API_BASEURL}/partnership`,
};

export {API_BASEURL, API_ENDPOINTS, API};