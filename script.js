var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.form = document.getElementById('resumeForm');
        this.resumeDisplay = document.getElementById('resumeDisplay');
        this.data = {
            name: '',
            email: '',
            phone: '',
            education: [],
            workExperience: [],
            skills: []
        };
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _a, _b, _c;
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.addEducationField.bind(this));
        (_b = document.getElementById('addWork')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.addWorkField.bind(this));
        (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.addSkillField.bind(this));
        // Real-time update listeners
        this.form.addEventListener('input', this.updateResume.bind(this));
    };
    ResumeBuilder.prototype.handleSubmit = function (e) {
        e.preventDefault();
        this.updateResume();
    };
    ResumeBuilder.prototype.updateResume = function () {
        this.collectFormData();
        this.renderResume();
    };
    ResumeBuilder.prototype.collectFormData = function () {
        var formData = new FormData(this.form);
        this.data.name = formData.get('name');
        this.data.email = formData.get('email');
        this.data.phone = formData.get('phone');
        this.data.education = this.collectMultipleFields('education-entry');
        this.data.workExperience = this.collectMultipleFields('work-entry');
        this.data.skills = Array.from(formData.getAll('skill'));
    };
    ResumeBuilder.prototype.collectMultipleFields = function (className) {
        return Array.from(this.form.getElementsByClassName(className)).map(function (entry) {
            var inputs = entry.getElementsByTagName('input');
            return Array.from(inputs).reduce(function (obj, input) {
                obj[input.classList[0]] = input.value;
                return obj;
            }, {});
        });
    };
    ResumeBuilder.prototype.renderResume = function () {
        document.getElementById('resumeName').textContent = this.data.name;
        document.getElementById('resumeEmail').textContent = this.data.email;
        document.getElementById('resumePhone').textContent = this.data.phone;
        this.renderEducation();
        this.renderWorkExperience();
        this.renderSkills();
    };
    ResumeBuilder.prototype.renderEducation = function () {
        var educationContainer = document.getElementById('resumeEducation');
        educationContainer.innerHTML = this.data.education.map(function (edu) { return "\n            <div>\n                <p><strong>".concat(edu.institution, "</strong></p>\n                <p>").concat(edu.degree, "</p>\n                <p>").concat(edu.year, "</p>\n            </div>\n        "); }).join('');
    };
    ResumeBuilder.prototype.renderWorkExperience = function () {
        var workContainer = document.getElementById('resumeWork');
        workContainer.innerHTML = this.data.workExperience.map(function (work) { return "\n            <div>\n                <p><strong>".concat(work.company, "</strong></p>\n                <p>").concat(work.position, "</p>\n                <p>").concat(work.duration, "</p>\n            </div>\n        "); }).join('');
    };
    ResumeBuilder.prototype.renderSkills = function () {
        var skillsContainer = document.getElementById('resumeSkills');
        skillsContainer.innerHTML = this.data.skills.map(function (skill) { return "\n            <li>".concat(skill, "</li>\n        "); }).join('');
    };
    ResumeBuilder.prototype.addEducationField = function () {
        var educationFields = document.getElementById('educationFields');
        var newField = document.createElement('div');
        newField.className = 'education-entry';
        newField.innerHTML = "\n            <input type=\"text\" class=\"institution\" placeholder=\"Institution\" required>\n            <input type=\"text\" class=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" class=\"year\" placeholder=\"Year\" required>\n        ";
        educationFields.appendChild(newField);
    };
    ResumeBuilder.prototype.addWorkField = function () {
        var workFields = document.getElementById('workFields');
        var newField = document.createElement('div');
        newField.className = 'work-entry';
        newField.innerHTML = "\n            <input type=\"text\" class=\"company\" placeholder=\"Company\" required>\n            <input type=\"text\" class=\"position\" placeholder=\"Position\" required>\n            <input type=\"text\" class=\"duration\" placeholder=\"Duration\" required>\n        ";
        workFields.appendChild(newField);
    };
    ResumeBuilder.prototype.addSkillField = function () {
        var skillFields = document.getElementById('skillFields');
        var newField = document.createElement('input');
        newField.type = 'text';
        newField.className = 'skill';
        newField.placeholder = 'Skill';
        newField.required = true;
        skillFields.appendChild(newField);
    };
    return ResumeBuilder;
}());
// Initialize the ResumeBuilder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    new ResumeBuilder();
});
