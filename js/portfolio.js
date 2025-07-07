// portfolio.js - Loads and renders project Markdown files dynamically

// List your project .md filenames here (add more as needed)
const projectFiles = [
  'projects/sample-project.md',
];

// Utility: fetch and parse Markdown, then render as project card
async function loadProjects() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  for (const file of projectFiles) {
    try {
      const res = await fetch(file);
      const md = await res.text();
      const html = marked.parse(md);
      // Extract metadata from Markdown (YAML frontmatter or custom tags)
      const meta = extractMeta(md);
      const card = document.createElement('div');
      card.className = 'project-card fade-in';
      // Media preview
      let media = '';
      if (meta.image) {
        media = `<img src="${meta.image}" class="project-media" alt="${meta.title}">`;
      } else if (meta.gif) {
        media = `<img src="${meta.gif}" class="project-media" alt="${meta.title}">`;
      } else if (meta.video) {
        media = `<video src="${meta.video}" class="project-media" controls></video>`;
      } else if (meta.youtube) {
        media = `<iframe class="project-media" src="https://www.youtube.com/embed/${meta.youtube}" frameborder="0" allowfullscreen></iframe>`;
      }
      // Tags
      let tags = '';
      if (meta.tags) {
        tags = `<div class="project-tags">${meta.tags.split(',').map(t => `<span class="project-tag">${t.trim()}</span>`).join('')}</div>`;
      }
      // Card inner HTML
      card.innerHTML = `
        ${media}
        <h3>${meta.title || 'Untitled Project'}</h3>
        <p>${meta.description || ''}</p>
        ${tags}
        ${meta.link ? `<a href="${meta.link}" target="_blank" rel="noopener" class="btn">View More</a>` : ''}
      `;
      // Modal preview for media
      if (media) {
        card.querySelector('.project-media').addEventListener('click', (e) => {
          e.stopPropagation();
          openModal(media);
        });
      }
      grid.appendChild(card);
    } catch (e) {
      console.error('Error loading project:', file, e);
    }
  }
}

// Extract metadata from Markdown (YAML frontmatter or custom tags)
function extractMeta(md) {
  const meta = {};
  // Simple YAML frontmatter parser
  const match = md.match(/^---([\s\S]+?)---/);
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) meta[key.trim()] = rest.join(':').trim();
    });
  }
  return meta;
}

// Modal logic
function openModal(content) {
  const modal = document.getElementById('media-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;
  modalContent.innerHTML = content;
  modal.classList.add('active');
}
document.querySelector('.close-modal').onclick = function() {
  document.getElementById('media-modal').classList.remove('active');
};
window.onclick = function(event) {
  const modal = document.getElementById('media-modal');
  if (event.target === modal) modal.classList.remove('active');
};

// Load projects on DOM ready
window.addEventListener('DOMContentLoaded', loadProjects); 