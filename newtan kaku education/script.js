// // Navigation
document.querySelectorAll('.nav a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show clicked section
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).classList.add('active');
        
        // Update active nav link (only for header navigation)
        if (this.parentElement.parentElement.classList.contains('nav')) {
            document.querySelectorAll('.nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        }
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Sections array
const sections = ['home', 'notes', 'practical', 'question-pattern', 'about', 'contact'];

// Notes Data
const notes = [
    { 
        title: 'Geomorphology Basics', 
        date: '2023-10-15', 
        category: 'Physical Geography', 
        link: '#',
        description: 'Fundamental concepts of landforms and their development processes'
    },
    { 
        title: 'Climatology Advanced', 
        date: '2023-10-20', 
        category: 'Physical Geography', 
        link: '#',
        description: 'Advanced atmospheric processes and weather systems'
    },
    { 
        title: 'Economic Geography', 
        date: '2023-10-25', 
        category: 'Human Geography', 
        link: '#',
        description: 'Spatial aspects of economic activities and development'
    },
    { 
        title: 'Oceanography', 
        date: '2023-11-05', 
        category: 'Physical Geography', 
        link: '#',
        description: 'Comprehensive study of oceans and marine ecosystems'
    },
    { 
        title: 'Population Geography', 
        date: '2023-11-10', 
        category: 'Human Geography', 
        link: '#',
        description: 'Distribution and dynamics of human populations'
    },
    { 
        title: 'Geopolitics', 
        date: '2023-11-15', 
        category: 'Political Geography', 
        link: '#',
        description: 'Geographical factors in international relations'
    }
];

// Load Notes
function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p class="note-category">${note.category}</p>
            <p class="note-description">${note.description}</p>
            <div class="note-footer">
                <small>Uploaded: ${note.date}</small>
                <a href="${note.link}" class="download-btn">Download <i class="fas fa-download"></i></a>
            </div>
        `;
        notesContainer.appendChild(noteCard);
    });
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const message = this.elements[3].value;
    
    // Here you would typically send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll contact you at ${email} shortly.`);
    
    // Reset form
    this.reset();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show home section by default
    document.querySelector('#home').classList.add('active');
    
    // Set first nav link as active
    document.querySelector('.nav a').classList.add('active');
    
    // Load notes
    loadNotes();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Add background text elements
    const bgTexts = ['Geography', 'Learning', 'Success'];
    const heroBgText = document.querySelector('.hero-bg-text');
    heroBgText.innerHTML = '';
    
    bgTexts.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        heroBgText.appendChild(p);
    });
});


// Exam Papers Section
// This section handles the switching between School and University exam papers

document.addEventListener("DOMContentLoaded", () => {
    // Tab Switching: School vs University
    const examTabs = document.querySelectorAll(".exam-tab");
    const examContents = document.querySelectorAll(".exam-content");

    examTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and contents
            examTabs.forEach(t => t.classList.remove("active"));
            examContents.forEach(c => c.classList.remove("active"));

            // Add active class to clicked tab and related content
            tab.classList.add("active");
            document.getElementById(`${tab.dataset.tab}-exams`).classList.add("active");
        });
    });

    // Grade Selector Switching (Class 10/11/12)
    const gradeButtons = document.querySelectorAll(".grade-btn");
    const gradePapers = document.querySelectorAll(".grade-papers");

    gradeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            gradeButtons.forEach(b => b.classList.remove("active"));
            gradePapers.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            document.querySelector(`.grade-papers[data-grade="${btn.dataset.grade}"]`).classList.add("active");
        });
    });

    // Semester Selector Switching (Semester 1–8)
    const semesterButtons = document.querySelectorAll(".semester-btn");
    const semesterPapers = document.querySelectorAll(".semester-papers");

    semesterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            semesterButtons.forEach(b => b.classList.remove("active"));
            semesterPapers.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            document.querySelector(`.semester-papers[data-sem="${btn.dataset.sem}"]`).classList.add("active");
        });
    });
});
























// Notes System for Main Website
function initNotesSystem() {
    loadNotesFromStorage();
    setupFilters();
}

// Load notes from localStorage
function loadNotesFromStorage(filteredNotes = null) {
    const notesContainer = document.getElementById('notesContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noResults = document.getElementById('noResults');
    
    // Show loading
    loadingIndicator.style.display = 'flex';
    notesContainer.style.display = 'none';
    noResults.style.display = 'none';
    
    setTimeout(() => {
        // Get notes from localStorage
        const notes = getNotesFromStorage();
        const notesToDisplay = filteredNotes || notes;
        
        notesContainer.innerHTML = '';
        
        if (notesToDisplay.length === 0) {
            noResults.style.display = 'block';
            notesContainer.style.display = 'none';
        } else {
            notesToDisplay.forEach(note => {
                const noteCard = createNoteCard(note);
                notesContainer.appendChild(noteCard);
            });
            notesContainer.style.display = 'grid';
            noResults.style.display = 'none';
        }
        
        loadingIndicator.style.display = 'none';
    }, 500);
}

// Get notes from localStorage
function getNotesFromStorage() {
    const notes = localStorage.getItem('newtanNotes');
    return notes ? JSON.parse(notes) : [];
}

// Create note card HTML
function createNoteCard(note) {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.setAttribute('data-category', note.category);
    noteCard.setAttribute('data-class', note.classLevel);
    
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${note.fileId}`;
    const previewUrl = `https://drive.google.com/file/d/${note.fileId}/view`;
    
    noteCard.innerHTML = `
        <div class="note-header">
            <h3>${note.title}</h3>
            <span class="note-category ${note.category}">${getCategoryLabel(note.category)}</span>
        </div>
        <p class="note-description">${note.description}</p>
        <div class="note-meta">
            <span class="file-size"><i class="fas fa-file-pdf"></i> ${note.fileSize}</span>
            <span class="file-pages"><i class="fas fa-file-alt"></i> ${note.pages} pages</span>
            <span class="upload-date"><i class="fas fa-calendar"></i> ${formatDate(note.uploadDate)}</span>
        </div>
        <div class="note-class">
            <i class="fas fa-graduation-cap"></i>
            ${getClassLabel(note.classLevel)}
        </div>
        <div class="note-actions">
            <a href="${previewUrl}" target="_blank" class="btn btn-preview">
                <i class="fas fa-eye"></i> Preview
            </a>
            <a href="${downloadUrl}" class="btn btn-download" onclick="trackDownload(${note.id})" download="${note.title}.pdf">
                <i class="fas fa-download"></i> Download
            </a>
        </div>
    `;
    
    return noteCard;
}

// Track downloads
function trackDownload(noteId) {
    const notes = getNotesFromStorage();
    const noteIndex = notes.findIndex(note => note.id === noteId);
    
    if (noteIndex !== -1) {
        notes[noteIndex].downloads = (notes[noteIndex].downloads || 0) + 1;
        localStorage.setItem('newtanNotes', JSON.stringify(notes));
    }
}

// Setup Search and Filter Functionality
function setupFilters() {
    const searchInput = document.getElementById('searchNotes');
    const categoryFilter = document.getElementById('categoryFilter');
    const classFilter = document.getElementById('classFilter');
    
    // Search functionality
    searchInput.addEventListener('input', filterNotes);
    categoryFilter.addEventListener('change', filterNotes);
    classFilter.addEventListener('change', filterNotes);
}

// Filter Notes Based on Criteria
function filterNotes() {
    const searchTerm = document.getElementById('searchNotes').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const classLevel = document.getElementById('classFilter').value;
    
    const notes = getNotesFromStorage();
    
    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm) || 
                             note.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || note.category === category;
        const matchesClass = classLevel === 'all' || note.classLevel === classLevel;
        
        return matchesSearch && matchesCategory && matchesClass;
    });
    
    loadNotesFromStorage(filteredNotes);
}

// Helper Functions
function getCategoryLabel(category) {
    const labels = {
        'physical': 'Physical Geography',
        'human': 'Human Geography',
        'practical': 'Practical Geography',
        'questions': 'Question Papers'
    };
    return labels[category] || category;
}

function getClassLabel(classLevel) {
    const labels = {
        'all': 'All Levels',
        '10': 'Class 10',
        '11': 'Class 11', 
        '12': 'Class 12',
        'university': 'University'
    };
    return labels[classLevel] || classLevel;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code
    initNotesSystem();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});