(async function() {
  const grid = document.getElementById('tools-grid');
  const filterBar = document.getElementById('filter-bar');

  const response = await fetch('tools.json');
  const tools = await response.json();

  const categories = ['All', ...new Set(tools.map(t => t.category))];

  filterBar.innerHTML = categories.map(cat =>
    `<button class="filter-btn" data-category="${cat}">${cat}</button>`
  ).join('');

  renderTools(tools);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      const filtered = cat === 'All' ? tools : tools.filter(t => t.category === cat);
      renderTools(filtered);
    });
  });

  function renderTools(toolList) {
    if (!toolList.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--muted)">No tools in this category yet.</p>`;
      return;
    }

    grid.innerHTML = toolList.map(tool => `
      <a href="${tool.url}" class="tool-card" target="_blank" rel="noopener">
        <div class="tool-header">
          <span class="tool-icon">${tool.icon || '🤖'}</span>
          <span class="tool-name">${tool.name}</span>
        </div>
        <div class="useful-for-label">🧰 Useful for</div>
        <div class="useful-for-text">${tool.usefulFor}</div>
        <span class="tool-category">${tool.category}</span>
      </a>
    `).join('');
  }
})();
