interface Education {
    institution: string;
    degree: string;
    year: string;
}

interface WorkExperience {
    company: string;
    position: string;
    duration: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    workExperience: WorkExperience[];
    skills: string[];
}

class ResumeBuilder {
    private form: HTMLFormElement;
    private resumeDisplay: HTMLElement;
    private data: ResumeData;

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
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

    private initializeEventListeners(): void {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        document.getElementById('addEducation')?.addEventListener('click', this.addEducationField.bind(this));
        document.getElementById('addWork')?.addEventListener('click', this.addWorkField.bind(this));
        document.getElementById('addSkill')?.addEventListener('click', this.addSkillField.bind(this));

        // Real-time update listeners
        this.form.addEventListener('input', this.updateResume.bind(this));
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        this.updateResume();
    }

    private updateResume(): void {
        this.collectFormData();
        this.renderResume();
    }

    private collectFormData(): void {
        const formData = new FormData(this.form);
        
        this.data.name = formData.get('name') as string;
        this.data.email = formData.get('email') as string;
        this.data.phone = formData.get('phone') as string;

        this.data.education = this.collectMultipleFields('education-entry');
        this.data.workExperience = this.collectMultipleFields('work-entry');
        this.data.skills = Array.from(formData.getAll('skill') as string[]);
    }

    private collectMultipleFields(className: string): any[] {
        return Array.from(this.form.getElementsByClassName(className)).map(entry => {
            const inputs = entry.getElementsByTagName('input');
            return Array.from(inputs).reduce((obj: any, input) => {
                obj[input.classList[0]] = input.value;
                return obj;
            }, {});
        });
    }

    private renderResume(): void {
        document.getElementById('resumeName')!.textContent = this.data.name;
        document.getElementById('resumeEmail')!.textContent = this.data.email;
        document.getElementById('resumePhone')!.textContent = this.data.phone;

        this.renderEducation();
        this.renderWorkExperience();
        this.renderSkills();
    }

    private renderEducation(): void {
        const educationContainer = document.getElementById('resumeEducation')!;
        educationContainer.innerHTML = this.data.education.map(edu => `
            <div>
                <p><strong>${edu.institution}</strong></p>
                <p>${edu.degree}</p>
                <p>${edu.year}</p>
            </div>
        `).join('');
    }

    private renderWorkExperience(): void {
        const workContainer = document.getElementById('resumeWork')!;
        workContainer.innerHTML = this.data.workExperience.map(work => `
            <div>
                <p><strong>${work.company}</strong></p>
                <p>${work.position}</p>
                <p>${work.duration}</p>
            </div>
        `).join('');
    }

    private renderSkills(): void {
        const skillsContainer = document.getElementById('resumeSkills')!;
        skillsContainer.innerHTML = this.data.skills.map(skill => `
            <li>${skill}</li>
        `).join('');
    }

    private addEducationField(): void {
        const educationFields = document.getElementById('educationFields')!;
        const newField = document.createElement('div');
        newField.className = 'education-entry';
        newField.innerHTML = `
            <input type="text" class="institution" placeholder="Institution" required>
            <input type="text" class="degree" placeholder="Degree" required>
            <input type="text" class="year" placeholder="Year" required>
        `;
        educationFields.appendChild(newField);
    }

    private addWorkField(): void {
        const workFields = document.getElementById('workFields')!;
        const newField = document.createElement('div');
        newField.className = 'work-entry';
        newField.innerHTML = `
            <input type="text" class="company" placeholder="Company" required>
            <input type="text" class="position" placeholder="Position" required>
            <input type="text" class="duration" placeholder="Duration" required>
        `;
        workFields.appendChild(newField);
    }

    private addSkillField(): void {
        const skillFields = document.getElementById('skillFields')!;
        const newField = document.createElement('input');
        newField.type = 'text';
        newField.className = 'skill';
        newField.placeholder = 'Skill';
        newField.required = true;
        skillFields.appendChild(newField);
    }
}

interface Education {
    institution: string;
    degree: string;
    year: string;
}

interface WorkExperience {
    company: string;
    position: string;
    duration: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    workExperience: WorkExperience[];
    skills: string[];
}

class ResumeBuilder {
    private form: HTMLFormElement;
    private resumeDisplay: HTMLElement;
    private data: ResumeData;

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
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

    private initializeEventListeners(): void {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        document.getElementById('addEducation')?.addEventListener('click', this.addEducationField.bind(this));
        document.getElementById('addWork')?.addEventListener('click', this.addWorkField.bind(this));
        document.getElementById('addSkill')?.addEventListener('click', this.addSkillField.bind(this));

        // Real-time update listeners
        this.form.addEventListener('input', this.updateResume.bind(this));

        // Editable resume listeners
        this.resumeDisplay.addEventListener('click', this.handleResumeClick.bind(this));
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        this.updateResume();
    }

    private updateResume(): void {
        this.collectFormData();
        this.renderResume();
    }

    private collectFormData(): void {
        const formData = new FormData(this.form);
        
        this.data.name = formData.get('name') as string;
        this.data.email = formData.get('email') as string;
        this.data.phone = formData.get('phone') as string;

        this.data.education = this.collectMultipleFields('education-entry');
        this.data.workExperience = this.collectMultipleFields('work-entry');
        this.data.skills = Array.from(formData.getAll('skill') as string[]);
    }

    private collectMultipleFields(className: string): any[] {
        return Array.from(this.form.getElementsByClassName(className)).map(entry => {
            const inputs = entry.getElementsByTagName('input');
            return Array.from(inputs).reduce((obj: any, input) => {
                obj[input.classList[0]] = input.value;
                return obj;
            }, {});
        });
    }

    private renderResume(): void {
        document.getElementById('resumeName')!.textContent = this.data.name;
        document.getElementById('resumeEmail')!.textContent = this.data.email;
        document.getElementById('resumePhone')!.textContent = this.data.phone;

        this.renderEducation();
        this.renderWorkExperience();
        this.renderSkills();
    }

    private renderEducation(): void {
        const educationContainer = document.getElementById('resumeEducation')!;
        educationContainer.innerHTML = this.data.education.map((edu, index) => `
            <div class="editable" data-type="education" data-index="${index}">
                <p><strong>${edu.institution}</strong></p>
                <p>${edu.degree}</p>
                <p>${edu.year}</p>
            </div>
        `).join('');
    }

    private renderWorkExperience(): void {
        const workContainer = document.getElementById('resumeWork')!;
        workContainer.innerHTML = this.data.workExperience.map((work, index) => `
            <div class="editable" data-type="work" data-index="${index}">
                <p><strong>${work.company}</strong></p>
                <p>${work.position}</p>
                <p>${work.duration}</p>
            </div>
        `).join('');
    }

    private renderSkills(): void {
        const skillsContainer = document.getElementById('resumeSkills')!;
        skillsContainer.innerHTML = this.data.skills.map((skill, index) => `
            <li class="editable" data-type="skill" data-index="${index}">${skill}</li>
        `).join('');
    }

    private handleResumeClick(e: Event): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('editable')) {
            this.makeEditable(target);
        }
    }

    private makeEditable(element: HTMLElement): void {
        const type = element.dataset.type;
        const index = parseInt(element.dataset.index || '0');

        let content: string;
        let inputFields: string;

        switch (type) {
            case 'education':
                const edu = this.data.education[index];
                content = `
                    <input type="text" name="institution" value="${edu.institution}">
                    <input type="text" name="degree" value="${edu.degree}">
                    <input type="text" name="year" value="${edu.year}">
                `;
                break;
            case 'work':
                const work = this.data.workExperience[index];
                content = `
                    <input type="text" name="company" value="${work.company}">
                    <input type="text" name="position" value="${work.position}">
                    <input type="text" name="duration" value="${work.duration}">
                `;
                break;
            case 'skill':
                content = `<input type="text" name="skill" value="${this.data.skills[index]}">`;
                break;
            default:
                content = `<input type="text" name="${element.dataset.field}" value="${element.textContent}">`;
        }

        element.innerHTML = `
            ${content}
            <div class="edit-buttons">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
            </div>
        `;
        element.classList.add('editing');

        const saveButton = element.querySelector('.save') as HTMLButtonElement;
        const cancelButton = element.querySelector('.cancel') as HTMLButtonElement;

        saveButton.addEventListener('click', () => this.saveEdit(element, type, index));
        cancelButton.addEventListener('click', () => this.cancelEdit(element, type, index));
    }

    private saveEdit(element: HTMLElement, type: string | undefined, index: number): void {
        const inputs = element.querySelectorAll('input');
        
        switch (type) {
            case 'education':
                this.data.education[index] = {
                    institution: (inputs[0] as HTMLInputElement).value,
                    degree: (inputs[1] as HTMLInputElement).value,
                    year: (inputs[2] as HTMLInputElement).value
                };
                break;
            case 'work':
                this.data.workExperience[index] = {
                    company: (inputs[0] as HTMLInputElement).value,
                    position: (inputs[1] as HTMLInputElement).value,
                    duration: (inputs[2] as HTMLInputElement).value
                };
                break;
            case 'skill':
                this.data.skills[index] = (inputs[0] as HTMLInputElement).value;
                break;
            default:
                const field = element.dataset.field as keyof ResumeData;
                this.data[field] = (inputs[0] as HTMLInputElement).value;
        }

        this.renderResume();
    }

    private cancelEdit(element: HTMLElement, type: string | undefined, index: number): void {
        this.renderResume();
    }

    // ... (other methods remain the same)
}


// Initialize the ResumeBuilder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});