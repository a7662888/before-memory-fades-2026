/* Interactive controls for 《在記憶被擦掉之前》2026/12/12 */
(function(){
  function stop(e){ e.stopPropagation(); }

  // 1. Drug & Taiwan-US Tabs (Slide 7)
  document.querySelectorAll('.k-tabs').forEach(function(bar){
    var btns = bar.querySelectorAll('.k-tab-btn');
    var root = bar.closest('.k-body');
    var panels = root ? root.querySelectorAll('.k-tab-panel') : [];
    btns.forEach(function(btn){
      btn.addEventListener('pointerup', stop);
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var target = btn.getAttribute('data-tab');
        btns.forEach(function(b){ b.classList.toggle('on', b === btn); });
        panels.forEach(function(p){ p.classList.toggle('on', p.getAttribute('data-panel') === target); });
      });
    });
  });

  // 2. 4-Pillar Explorer (Slide 8)
  document.querySelectorAll('.k-pillars').forEach(function(grid){
    var cards = grid.querySelectorAll('.k-pillar');
    var box = grid.parentElement.querySelector('.k-pillar-detail');
    cards.forEach(function(card){
      card.addEventListener('pointerup', stop);
      card.addEventListener('click', function(e){
        e.stopPropagation();
        cards.forEach(function(c){ c.classList.toggle('on', c === card); });
        if (box && card.dataset.detail) {
          box.textContent = card.dataset.detail;
        }
      });
    });
  });

  // 3. Family 4-Step Action Checklist (Slide 18)
  document.querySelectorAll('.k-check-list').forEach(function(list){
    var items = list.querySelectorAll('.k-chk');
    var status = list.parentElement.querySelector('.k-chk-status');
    function updateStatus(){
      var doneCount = list.querySelectorAll('.k-chk.done').length;
      if (status) {
        if (doneCount === 0) {
          status.textContent = '點擊上方行動項目，勾選您今天想帶回家的第一步（已勾選 0 / ' + items.length + ' 項）';
        } else if (doneCount < items.length) {
          status.textContent = '太棒了！您已經為家人踏出第 ' + doneCount + ' 步（共 ' + items.length + ' 步），今天就能開始行動。';
        } else {
          status.textContent = '✓ 四步行動全部就位！我們與醫療團隊、1966 長照專線會陪您一起走。';
        }
      }
    }
    items.forEach(function(item){
      item.addEventListener('pointerup', stop);
      item.addEventListener('click', function(e){
        e.stopPropagation();
        item.classList.toggle('done');
        var box = item.querySelector('.k-box');
        if (box) box.textContent = item.classList.contains('done') ? '✓' : '';
        updateStatus();
      });
    });
  });

  // 4. Replay buttons for animated mechanism diagrams (Slide 6 & Slide 14)
  document.querySelectorAll('.k-replay-btn').forEach(function(btn){
    btn.addEventListener('pointerup', stop);
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var panel = btn.closest('.k-anim-panel');
      if (!panel) return;
      var anims = panel.querySelectorAll('.k-proto, .k-yab, .k-microglia, .k-sigdot, .k-leak-drop, .k-leak-rbc, .k-mri-badge');
      anims.forEach(function(el){
        var prev = el.style.animation;
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = prev;
      });
    });
  });
})();
