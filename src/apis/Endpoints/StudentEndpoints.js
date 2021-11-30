import DomainUrl from "../Domain";

export const STUDENT_ENDPOINTS = {
    register: {
        url: `${DomainUrl}/students/register`,
        method: 'POST',
    },
    getMyProfile:{
        url: `${DomainUrl}/students/me`,
        method:'GET'
    }
};

