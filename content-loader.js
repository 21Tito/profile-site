// Content Loader Utility
// Loads and provides access to content.json data across all pages

let contentData = null;

// Load content.json
async function loadContent() {
    if (contentData) return contentData;

    try {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        contentData = await response.json();
        return contentData;
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

// Get case study by ID
function getCaseStudyById(id) {
    if (!contentData) return null;
    return contentData.caseStudies.find(cs => cs.id === id);
}

// Get all case studies
function getAllCaseStudies() {
    if (!contentData) return [];
    return contentData.caseStudies;
}

// Get profile data
function getProfile() {
    if (!contentData) return null;
    return contentData.profile;
}

// Get experience data
function getExperience() {
    if (!contentData) return [];
    return contentData.experience;
}

// Get "How I Work" sections
function getHowIWork() {
    if (!contentData) return null;
    return contentData.howIWork;
}

// Get tech stack
function getTechStack() {
    if (!contentData) return null;
    return contentData.techStack;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get URL parameter
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}
