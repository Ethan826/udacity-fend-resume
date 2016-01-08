/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="helper.ts"/>

// ==========================================================================//
// Interface definitions
// ==========================================================================//

interface Contacts {
  mobile: string;
  email: string;
  github: string;
  location: string;
}

interface Bio {
  name: string;
  role: string;
  contacts: Contacts;
  welcomeMessage: string;
  skills: string[];
  biopic: string;
  display: () => void;
}

interface School {
  name: string;
  location: string;
  degree: string;
  majors: string[];
  dates: number;
  url: string;
}

interface OnlineCourse {
  title: string;
  school: string;
  date: number;
  url: string;
}

interface Education {
  schools: School[];
  onlineCourses: OnlineCourse[];
  display: () => void;
}

interface Job {
  employer: string;
  title: string;
  location: string;
  dates: string;
  description: string;
}

interface Work {
  jobs: Job[];
  display: () => void;
}

interface Project {
  title: string;
  dates: string;
  description: string;
  images: string[];
}

interface Projects {
  projects: Project[];
  display: () => void;
}

// Compose interfaces into representative of final resume object
interface Resume {
  bio: Bio;
  education: Education;
  work: Work;
  projects: Projects;
}

// ==========================================================================//
// Class defintion
// ==========================================================================//

class ResumePage {

  constructor(private resume: Resume) {}

  private populateBio(): void {
    let b = this.resume.bio;
    // Reorder so the row div is created first and then filled.
    $("#header").prepend(HTMLheaderRole.replace("%data%", b.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", b.name));
    $("#role").after(HTMLbioPic.replace("%data%", b.biopic));
    $("#topContacts").append(HTMLmobile.replace("%data%", b.contacts.mobile));
    $("#topContacts").append(HTMLemail.replace("%data%", b.contacts.email));
    $("#topContacts").append(HTMLgithub.replace("%data%", b.contacts.github));
    $("#topContacts").append(HTMLlocation.replace("%data%", b.contacts.location));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", b.welcomeMessage));
    $("#header").append(HTMLskillsStart);
    for (let s of b.skills) {
      $("#skills").append(HTMLskills.replace("%data%", s));
    }
  }

  private populateEducation(): void {
    for (let s of this.resume.education.schools) {
      $("#education").append(HTMLschoolStart);
      $(".education-entry:last").append(HTMLschoolName.replace("%data%", s.name));
      $(".education-entry:last").append(HTMLschoolDegree.replace("%data%", s.degree));
      $(".education-entry:last").append(HTMLschoolDates.replace("%data%", String(s.dates)));
      $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", s.location));
      for (let m of s.majors) {
        $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", m));
      }
    }

    $("#education").append(HTMLonlineClasses);

    for (let o of this.resume.education.onlineCourses) {
      $("#education:last").append(HTMLschoolStart);
      $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", o.title));
      $(".education-entry:last").append(HTMLonlineSchool.replace("%data%", o.school));
      $(".education-entry:last").append(HTMLonlineDates.replace("%data%", String(o.date)));
      $(".education-entry:last").append(HTMLonlineURL.replace("%data%", o.url));
    }
  }


  private populateWork(): void {
    for (let j of this.resume.work.jobs) {
      $("#workExperience").append(HTMLworkStart);
      $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", j.employer));
      $(".work-entry:last").append(HTMLworkTitle.replace("%data%", j.title));
      $(".work-entry:last").append(HTMLworkDates.replace("%data%", j.dates));
      $(".work-entry:last").append(HTMLworkLocation.replace("%data%", j.location));
      $(".work-entry:last").append(HTMLworkDescription.replace("%data%", j.description));
    }
  }

  private populateProjects(): void {
    for (let p of this.resume.projects.projects) {
      $("#projects").append(HTMLprojectStart);
      $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", p.title));
      $(".project-entry:last").append(HTMLprojectDates.replace("%data%", p.dates));
      $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", p.description));
      for (let i of p.images) {
        $(".project-entry:last").append(HTMLprojectImage.replace("%data%", i));
      }
    }
  }

  private populateFooter(): void {
    let cs: Contacts = this.resume.bio.contacts;
    $("#footerContacts").append(html);
    for (let c in cs) {
        let html: string = "<li class='flex-item'>" +
            `<span class="orange-text">${c}</span>` +
            `<span class="white-text">${cs[c]}</span>` +
            "</li>";
      $("#footerContacts").append(html);
    }
  }

  // Re-implementation of the hiding declared inline in index.html
  // private hideMissing(): void {
  //   if ($(".flex-item").length == 0) {
  //     $("#topContacts").hide();
  //     $("#lets-connect").hide();
  //   }
  //   if ($("h1").length == 0) $("#header").hide();
  //   if ($(".work-entry").length == 0) $("#workExperience").hide();
  //   if ($(".project-entry").length == 0) $("#projects").hide();
  //   if ($(".education-entry").length == 0) $("#education").hide();
  //   if ($("#map") == null) $("#mapDiv").hide();
  // }

  populatePage() {
    this.populateBio();
    this.populateEducation();
    this.populateWork();
    this.populateProjects();
    this.populateFooter();
    // this.hideMissing();
  }
}

// ==========================================================================//
// JS Objects
// ==========================================================================//
let bio = {
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
  "biopic": "https://www.petfinder.com/wp-content/uploads/2012/11/122163343-conditioning-dog-loud-noises-632x475.jpg",
  "display": this.populateBio // "this" is in scope when passed into ResumePage
};


let education = {
  "schools":
  [
    {
      "name": "Harletd Law School",
      "location": "Cambridge, MA",
      "degree": "J.D.",
      "majors": ["Law"],
      "dates": 2011,
      "url": "http://hls.harletd.edu/"
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

let work = {
  "jobs": [{
    "employer": "Kelley Drye & Warren LLP",
    "title": "Associate Attorney",
    "location": "Chicago",
    "dates": "2015-Present",
    "description": "Mid-level litigation associate at large national law firm."
  }],
  "display": this.populateWork
};

let projects = {
    "projects": [{
        "title": "Udacity Catalog App",
        "dates": "2015",
        "description": "Flask app using a Postgresql backend.",
        "images": ["foo", "bar"]
    }],
    "display": this.populateProjects
};

// Compose objects into final combined object
let data = {
    bio: bio,
    education: education,
    work: work,
    projects: projects
};

let resumePage = new ResumePage(data);
resumePage.populatePage();