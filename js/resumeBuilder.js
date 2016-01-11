/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/googlemaps/google.maps.d.ts" />
/// <reference path="../typings/helper.d.ts" />
// ==========================================================================//
// Class defintion
// ==========================================================================//
var ResumePage = (function () {
    function ResumePage(resume) {
        this.resume = resume;
        this.populatePage();
        this.mapBuilder();
    }
    ResumePage.prototype.populateBio = function () {
        var b = this.resume.bio;
        // Put an empty <div class="row" id="headline"></div>
        $("#header").prepend(HTMLheadline);
        // Make the namerole column
        $("#headline").prepend(HTMLnameRole);
        $("#namerole").append(HTMLheaderName.replace("%data%", b.name));
        $("#namerole").append(HTMLheaderRole.replace("%data%", b.role));
        // Make the picture colulmn
        $("#headline:last").append(HTMLpicture);
        $("#picture").append(HTMLbioPic.replace("%data%", b.biopic));
        // Make the contacts row
        $("#topContacts").append(HTMLcontacts);
        $("#contacts").append(HTMLcontactsList);
        $("#contactslist").append(HTMLmobile.replace("%data%", b.contacts.mobile));
        $("#contactslist").append(HTMLemail.replace("%data%", b.contacts.email));
        $("#contactslist").append(HTMLgithub.replace("%data%", b.contacts.github));
        $("#contactslist").append(HTMLlocation.replace("%data%", b.contacts.location));
        // Make the skills row
        $("#topContacts:last").append(HTMLskillsRow);
        // Make columns for skills and statement 
        $("#skillsrow").append(HTMLskillsHead);
        $("#skillshead").append(HTMLskillsStart);
        $("#skillsrow:last").append(HTMLskillsList);
        $("#skillslist").append(HTMLskillsContainer);
        for (var _i = 0, _a = b.skills; _i < _a.length; _i++) {
            var s = _a[_i];
            $("#skills:last").append(HTMLskills.replace("%data%", s));
        }
        $("#skillsrow:last").append(HTMLskillsQuote);
        $("#skillsquote").append(HTMLgreeting);
    };
    ResumePage.prototype.populateEducation = function () {
        // Loop over jobs
        for (var s in this.resume.education.schools) {
            var ss = this.resume.education.schools[s];
            var id = "ed-" + s;
            $("#education:last").append(HTMLschoolStart);
            $(".education-entry:last").attr("id", id);
            $("#" + id).append("<div class='row'><div class='col-md-12' id='school-" + id + "'></div></div>");
            var txt = HTMLschoolName.replace("%data%", ss.name) + HTMLschoolDegree.replace("%data%", ss.degree);
            $("#school-" + id).append(txt);
            // Add year / location row and insert text
            $("#" + id + ":last").append("<div class=\"row\" id=\"place-date-" + id + "\">                <div class='col-md-6' id=\"date-" + id + "\"></div><div class='col-md-6' id='place-" + id + "'></div></div>");
            $("#date-" + id).append(HTMLschoolDates.replace("%data%", String(ss.dates)));
            // Add description row and insert text
            $("#place-" + id).append(HTMLworkLocation.replace("%data%", ss.location));
            var majors = HTMLschoolMajor.replace("%data%", ss.majors.join(", "));
            $("#" + id + ":last").append("<div class=\"row\"><div class=\"col-md-12 work-description\">" + majors + "</div></div>");
        }
        $("#education").append(HTMLonlineClasses);
        for (var o in this.resume.education.onlineCourses) {
            var os = this.resume.education.onlineCourses[o];
            var id = "online-" + o;
            $("#education:last").append(HTMLschoolStart);
            $(".education-entry:last").attr("id", id);
            $("#" + id).append("<div class='row'><div class='col-md-12' id='school-" + id + "'></div></div>");
            var schoolclass = HTMLonlineTitle.replace("%data%", os.school) + HTMLonlineSchool.replace("%data%", os.title);
            $("#school-" + id + ":last").append(HTMLonlineSchool.replace("%data%", schoolclass));
            $("#school-" + id + ":last").append(HTMLonlineDates.replace("%data%", String(os.date)));
            $("#school-" + id + ":last").append(HTMLonlineURL.replace("%data%", os.url));
        }
    };
    ResumePage.prototype.populateWork = function () {
        // Loop over jobs
        for (var j in this.resume.work.jobs) {
            var js = this.resume.work.jobs[j];
            var id = "work-" + j;
            // Put master div
            $("#workExperience:last").append(HTMLworkStart);
            // Add a unique id for each job
            $(".work-entry:last").last().attr("id", id);
            // Add employer / job title row and insert text
            $("#" + id).append("<div class='row'><div class='col-md-12' id='employer-" + id + "'></div></div>");
            var txt = HTMLworkEmployer.replace("%data%", js.employer) + HTMLworkTitle.replace("%data%", js.title);
            $("#employer-" + id).append(txt);
            // Add year / location row and insert text
            $("#" + id + ":last").append("<div class=\"row\" id=\"place-date-" + id + "\">                <div class='col-md-6' id=\"date-" + id + "\"></div><div class='col-md-6' id='place-" + id + "'></div></div>");
            $("#date-" + id).append(HTMLworkDates.replace("%data%", js.dates));
            // Add description row and insert text
            $("#place-" + id).append(HTMLworkLocation.replace("%data%", js.location));
            var desc = HTMLworkDescription.replace("%data%", js.description);
            $("#" + id + ":last").append("<div class=\"row\"><div class=\"col-md-12 work-description\">" + desc + "</div></div>");
        }
    };
    ResumePage.prototype.populateProjects = function () {
        for (var p in this.resume.projects.projects) {
            var ps = this.resume.projects.projects[p];
            var id = "project-" + p;
            // Put master div
            $("#projects:last").append(HTMLprojectStart);
            // Add a unique id for each job
            $(".project-entry:last").last().attr("id", id);
            $("#" + id).append("<div class=\"md-col-12\" id=\"col-" + id + "\"></div>");
            $("#col-" + id + ":last").append(HTMLprojectTitle.replace("%data%", ps.title));
            $("#col-" + id + ":last").append(HTMLprojectDates.replace("%data%", ps.dates));
            $("#col-" + id + ":last").append(HTMLprojectDescription.replace("%data%", ps.description));
            for (var _i = 0, _a = ps.images; _i < _a.length; _i++) {
                var i = _a[_i];
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", i));
            }
        }
    };
    ResumePage.prototype.populateFooter = function () {
        $("#lets-connect").addClass("row");
        $("#footerContacts").addClass("flex-container");
        var cs = this.resume.bio.contacts;
        for (var c in cs) {
            var html = "<li class='flex-item'>" +
                ("<span class=\"intro\">" + c + "</span>") +
                ("<span class=\"info\">" + cs[c] + "</span>") +
                "</li>";
            $("#footerContacts").append(html);
        }
    };
    ResumePage.prototype.makeMapDiv = function () {
        $("#mapDiv:last").append("<div class='row'><div class='col-md-12' id='map'></div></div>");
    };
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
    ResumePage.prototype.populatePage = function () {
        this.populateBio();
        this.populateEducation();
        this.populateWork();
        this.populateProjects();
        this.populateFooter();
        this.makeMapDiv();
        // this.hideMissing(); // TODO: reimplement with changes to page. Use IDs?
    };
    ResumePage.prototype.locationFinder = function () {
        var locations = [];
        locations.push(this.resume.bio.contacts.location);
        this.resume.education.schools.forEach(function (school) {
            locations.push(school.location);
        });
        this.resume.work.jobs.forEach(function (job) {
            locations.push(job.location);
        });
        return locations;
    };
    ResumePage.prototype.mapBuilder = function () {
        var jsElement = document.getElementById("map");
        this.map = new GoogleMap(jsElement, this.locationFinder());
    };
    return ResumePage;
})();
var GoogleMap = (function () {
    function GoogleMap(jsElement, locations) {
        this.locations = locations;
        var options = { disableDefaultUI: true };
        this.map = new google.maps.Map(jsElement, options);
        this.bounds = new google.maps.LatLngBounds();
        $(window).resize(function () {
            this.map.fitBounds(this.bounds);
        });
        this.pinPoster();
    }
    ;
    GoogleMap.prototype.createMapMarker = function (placeData) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeData.geometry.location,
            title: name
        });
        var infoWindow = new google.maps.InfoWindow({
            content: placeData.formatted_address
        });
        google.maps.event.addListener(marker, "click", function () {
            infoWindow.open(this.map, marker);
        });
        this.bounds.extend(new google.maps.LatLng(placeData.geometry.location.lat(), placeData.geometry.location.lng()));
        this.map.fitBounds(this.bounds);
        this.map.setCenter(this.bounds.getCenter());
    };
    GoogleMap.prototype.pinPoster = function () {
        var self = this;
        var service = new google.maps.places.PlacesService(this.map);
        this.locations.forEach(function (place) {
            var request = { query: place };
            service.textSearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    self.createMapMarker(results[0]);
                }
            });
        });
    };
    ;
    return GoogleMap;
})();
// ==========================================================================//
// JS Objects
// ==========================================================================//
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
    "skills": ["Python", "JavaScript", "HTML", "CSS", "Clojure", "TypeScript"],
    "biopic": "https://www.petfinder.com/wp-content/uploads/2012/11/122163343-conditioning-dog-loud-noises-632x475.jpg",
    "display": this.populateBio // "this" is in scope when passed into ResumePage
};
var education = {
    "schools": [
        {
            "name": "Harvard Law School",
            "location": "Cambridge, MA",
            "degree": "J.D.",
            "majors": ["Law"],
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
        }, {
            "employer": "San Diego Flight Training, Int'l",
            "title": "Flight Instructor",
            "location": "San Diego",
            "dates": "2004-2006",
            "description": "Trained students to fly small airplanes."
        }],
    "display": this.populateWork
};
var projects = {
    "projects": [{
            "title": "Udacity Catalog App",
            "dates": "2015",
            "description": "Flask app using a Postgresql backend.",
            "images": ["foo", "bar"]
        }, {
            "title": "Murder for Hire Outfit",
            "dates": "1929",
            "description": "Worked as enforcer for Al Capone.",
            "images": ["baz", "quux"]
        }],
    "display": this.populateProjects
};
// Compose objects into final combined object
var data = {
    bio: bio,
    education: education,
    work: work,
    projects: projects
};
var resumePage = new ResumePage(data);
