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

// Initialize the ResumeBuilder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});