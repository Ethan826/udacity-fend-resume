var ResumePage = (function () {
    function ResumePage(input) {
        this.resume = input;
    }
    ResumePage.prototype.populateBio = function () {
        $("#header").prepend(HTMLheaderRole.replace("%data%", this.resume.bio.role));
        $("#header").prepend(HTMLheaderName.replace("%data%", this.resume.bio.name));
        $("#topContacts").append(HTMLmobile.replace("%data%", this.resume.bio.contacts.mobile));
        $("#topContacts").append(HTMLemail.replace("%data%", this.resume.bio.contacts.email));
        $("#topContacts").append(HTMLgithub.replace("%data%", this.resume.bio.contacts.github));
        $("#topContacts").append(HTMLlocation.replace("%data%", this.resume.bio.contacts.location));
        $("#header").append(HTMLbioPic.replace("%data%", this.resume.bio.biopic));
        $("#header").append(HTMLwelcomeMsg.replace("%data%", this.resume.bio.welcomeMessage));
        $("#header").append(HTMLskillsStart);
        for (var _i = 0, _a = this.resume.bio.skills; _i < _a.length; _i++) {
            var skill = _a[_i];
            $("#skills").append(HTMLskills.replace("%data%", skill));
        }
    };
    ResumePage.prototype.populateEducation = function () {
        for (var _i = 0, _a = this.resume.education.schools; _i < _a.length; _i++) {
            var s = _a[_i];
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(HTMLschoolName.replace("%data%", s.name));
            $(".education-entry:last").append(HTMLschoolDegree.replace("%data%", s.degree));
            $(".education-entry:last").append(HTMLschoolDates.replace("%data%", String(s.dates)));
            $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", s.location));
            for (var _b = 0, _c = s.majors; _b < _c.length; _b++) {
                var m = _c[_b];
                $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", m));
            }
        }
        $("#education").append(HTMLonlineClasses);
        for (var _d = 0, _e = this.resume.education.onlineCourses; _d < _e.length; _d++) {
            var o = _e[_d];
            $("#education:last").append(HTMLschoolStart);
            $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", o.title));
            $(".education-entry:last").append(HTMLonlineSchool.replace("%data%", o.school));
            $(".education-entry:last").append(HTMLonlineDates.replace("%data%", String(o.date)));
            $(".education-entry:last").append(HTMLonlineURL.replace("%data%", o.url));
        }
    };
    ResumePage.prototype.populateWork = function () {
        for (var _i = 0, _a = this.resume.work.jobs; _i < _a.length; _i++) {
            var j = _a[_i];
            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", j.employer));
            $(".work-entry:last").append(HTMLworkTitle.replace("%data%", j.title));
            $(".work-entry:last").append(HTMLworkDates.replace("%data%", j.dates));
            $(".work-entry:last").append(HTMLworkLocation.replace("%data%", j.location));
            $(".work-entry:last").append(HTMLworkDescription.replace("%data%", j.description));
        }
    };
    ResumePage.prototype.populateProjects = function () {
        for (var _i = 0, _a = this.resume.projects.projects; _i < _a.length; _i++) {
            var p = _a[_i];
            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", p.title));
            $(".project-entry:last").append(HTMLprojectDates.replace("%data%", p.dates));
            $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", p.description));
            for (var _b = 0, _c = p.images; _b < _c.length; _b++) {
                var i = _c[_b];
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", i));
            }
        }
    };
    ResumePage.prototype.populatePage = function () {
        this.populateBio();
        this.populateEducation();
        this.populateWork();
        this.populateProjects();
    };
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
    "skills": ["Python", "HTML", "CSS", "Clojure", "TypeScript"],
    "biopic": "http://weknowyourdreams.com/images/dog/dog-07.jpg",
    "display": this.populateBio
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
        }, {
            "name": "Embry-Riddle Aeronautical University",
            "location": "Daytona Beach, FL",
            "degree": "B.S.",
            "majors": ["Aeronautical Science"],
            "dates": 2003,
            "url": "http://www.erau.edu/"
        }],
    "onlineCourses": [{
            "title": "Full-Stack Web Developer Nanodegree",
            "school": "Udacity",
            "date": 2015,
            "url": "http://www.udacity.com/"
        }, {
            "title": "Front-End Web Developer Nanodegree",
            "school": "Udacity",
            "date": 2016,
            "url": "http://www.udacity.com/"
        }],
    "display": this.populateEducation
};
var work = {
    "jobs": [{
            "employer": "Kelley Drye & Warren LLP",
            "title": "Associate Attorney",
            "location": "Chicago",
            "dates": "2015-Present",
            "description": "Mid-level litigation associate at large national law firm."
        }],
    "display": this.populateWork
};
var projects = {
    "projects": [{
            "title": "Udacity Catalog App",
            "dates": "2015",
            "description": "Flask app using a Postgresql backend.",
            "images": ["foo", "bar"]
        }],
    "display": this.populateProjects
};
var data = {
    bio: bio,
    education: education,
    work: work,
    projects: projects
};
var resumePage = new ResumePage(data);
resumePage.populatePage();
