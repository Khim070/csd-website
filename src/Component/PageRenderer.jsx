import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PageHeader from './PageHeader'
import { API_ENDPOINTS } from '../Service/APIconfig';
import Slideshow from './Slideshow/Slideshow';
// import SlideshowSection from './SectionUI/SlideshowSection';
// import ServiceSection from './SectionUI/ServiceSection';
// import ProgramsSection from './SectionUI/ProgramsSection';

const PageRenderer = ({ page }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        if (page && page.p_id) {
            axios.get(API_ENDPOINTS.getSection)
                .then(res => {
                    const pageSections = res.data.data
                        .filter(section => section.sec_page === page.p_id)
                        .filter(display => display.display === 1);
                    const orderedSections = [...pageSections].sort((a, b) => a.sec_order - b.sec_order);
                    setSections(orderedSections);
                })
                .catch(err => console.error('Error fetching sections:', err));
        }

    }, [page]);
    // console.log("sections: ",sections);
    // console.log("page: ",page);
    // console.log("page.p_id: ",page.p_id);

    const renderSection = (section) => {
        switch (section.sec_type) {
            case "Slideshow":
                return <Slideshow key={section.sec_id} section={section} />;
            // case "Service":
            //     return <ServiceSection key={section.sec_id} section={section} />;
            // case "Programs":
            //     return <ProgramsSection key={section.sec_id} section={section} />;
            default:
                return <div key={section.sec_id}>Unknown section type: {section.sec_type}</div>;
        }
    };

    return (
        <>
            <PageHeader />
            {sections.map(renderSection)}
        </>
    )
}

export default PageRenderer