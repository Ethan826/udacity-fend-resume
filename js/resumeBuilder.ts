/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="helper.ts"/>

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

interface Resume {
  bio: Bio;
  education: Education;
  work: Work;
  projects: Projects;
}

class ResumePage {
  private resume: Resume;

  constructor(input: Resume) {
    this.resume = input;
  }

  private populateBio(): void {
    $("#header").prepend(HTMLheaderRole.replace("%data%", this.resume.bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", this.resume.bio.name));
    $("#topContacts").append(HTMLmobile.replace("%data%", this.resume.bio.contacts.mobile));
    $("#topContacts").append(HTMLemail.replace("%data%", this.resume.bio.contacts.email));
    $("#topContacts").append(HTMLgithub.replace("%data%", this.resume.bio.contacts.github));
    $("#topContacts").append(HTMLlocation.replace("%data%", this.resume.bio.contacts.location));
    $("#header").append(HTMLbioPic.replace("%data%", this.resume.bio.biopic));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", this.resume.bio.welcomeMessage));
    $("#header").append(HTMLskillsStart);
    for (let skill of this.resume.bio.skills) {
      $("#skills").append(HTMLskills.replace("%data%", skill));
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

  populatePage() {
    this.populateBio();
    this.populateEducation();
    this.populateWork();
    this.populateProjects();
  }
}

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
  "schools":
  [
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
}

var data = {
  bio: bio,
  education: education,
  work: work,
  projects: projects
}

var resumePage = new ResumePage(data);
resumePage.populatePage();
