var ResumePage = (function () {
    function ResumePage(input) {
        this.resume = input;
    }
    return ResumePage;
}());
var bio = {
    "name": "Ethan Kent",
    "role": "Full-Stack Web Developer",
    "contacts": {
        "mobile": "(312) 833-2869",
        "email": "ethan826@gmail.com",
        "github": "https://github.com/Ethan826/",
        "location": "Chicago"
    },
    "welcomeMessage": "Welcome to my resume",
    "skills": ["Python", "TypeScript"],
    "biopic": "http://www.nytimes.com/",
    "display": function () { }
};
var education = {
    "schools": [
        {
            "name": "Harvard Law School",
            "location": "Cambridge, MA",
            "degree": "J.D.",
            "majors": ["foo", "bar"],
            "dates": 2011,
            "url": "http://hls.harvard.edu/"
        }],
    "onlineCourses": [{
            "title": "Full-Stack Web Developer Nanodegree",
            "school": "Udacity",
            "date": 2015,
            "url": "http://www.udacity.com/"
        }],
    "display": function () { }
};
var work = {
    "jobs": [{
            "employer": "Kelley Drye & Warren LLP",
            "title": "Associate Attorney",
            "location": "Chicago",
            "dates": "2015",
            "description": "Mid-level litigation associate at large national law firm."
        }],
    "display": function () { }
};
var projects = {
    "projects": [{
            "title": "Udacity Catalog App",
            "dates": "2015",
            "description": "Flask app using a Postgresql backend.",
            "images": ["foo", "bar"]
        }],
    "display": function () { }
};
var data = {
    bio: bio,
    education: education,
    work: work,
    projects: projects
};
var resumePage = new ResumePage(data);
