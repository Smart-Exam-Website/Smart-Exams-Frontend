import DomainUrl from "../Domain";

export const INSTRUCTOR_ENDPOINTS = {
    register: {
        url: `${DomainUrl}/instructors/register`,
        method: 'POST',
    },
    getMyProfile:{
        url: `${DomainUrl}/instructors/me`,
        method:'GET'
    }
};

