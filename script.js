const eventDate = new Date('2026-08-01T21:00:00-03:00').getTime();
const ids = ['days','hours','minutes','seconds'];
function updateCountdown(){
  let total = Math.max(0, eventDate - Date.now());
  const values = [Math.floor(total/86400000), Math.floor(total/3600000)%24, Math.floor(total/60000)%60, Math.floor(total/1000)%60];
  ids.forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));
}
updateCountdown(); setInterval(updateCountdown,1000);
const mapModal = document.getElementById('mapsModal');
const openMap = document.getElementById('openMap');
function closeMap(){ mapModal.classList.remove('is-open'); mapModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openMap.addEventListener('click',()=>{ mapModal.classList.add('is-open'); mapModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; });
mapModal.querySelectorAll('[data-close-map]').forEach(element=>element.addEventListener('click',closeMap));
document.addEventListener('keydown',event=>{ if(event.key==='Escape' && mapModal.classList.contains('is-open')) closeMap(); });
const ceremonyMapModal = document.getElementById('ceremonyMapModal');
const openCeremonyMap = document.getElementById('openCeremonyMap');
function closeCeremonyMap(){ ceremonyMapModal.classList.remove('is-open'); ceremonyMapModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openCeremonyMap.addEventListener('click',()=>{ ceremonyMapModal.classList.add('is-open'); ceremonyMapModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; });
ceremonyMapModal.querySelectorAll('[data-close-ceremony-map]').forEach(element=>element.addEventListener('click',closeCeremonyMap));
document.addEventListener('keydown',event=>{ if(event.key==='Escape' && ceremonyMapModal.classList.contains('is-open')) closeCeremonyMap(); });
const giftsModal = document.getElementById('giftsModal');
const openGifts = document.getElementById('openGifts');
function closeGifts(){ giftsModal.classList.remove('is-open'); giftsModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openGifts.addEventListener('click',()=>{ giftsModal.classList.add('is-open'); giftsModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; });
giftsModal.querySelectorAll('[data-close-gifts]').forEach(element=>element.addEventListener('click',closeGifts));
document.addEventListener('keydown',event=>{ if(event.key==='Escape' && giftsModal.classList.contains('is-open')) closeGifts(); });
const copyAliasButton = giftsModal.querySelector('[data-copy-alias]');
const copyStatus = giftsModal.querySelector('.gift-modal__copy-status');
copyAliasButton.addEventListener('click', async () => {
  const alias = 'zairazepps.xv';
  try {
    await navigator.clipboard.writeText(alias);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = alias;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  copyStatus.textContent = '¡Alias copiado!';
  copyStatus.classList.add('is-copied');
  setTimeout(() => {
    copyStatus.textContent = 'Podés copiar el alias directamente desde el ícono.';
    copyStatus.classList.remove('is-copied');
  }, 2200);
});
const galleryTrack = document.getElementById('galleryTrack');
document.getElementById('galleryPrev').addEventListener('click', () => galleryTrack.scrollBy({ left: -galleryTrack.clientWidth, behavior: 'smooth' }));
document.getElementById('galleryNext').addEventListener('click', () => galleryTrack.scrollBy({ left: galleryTrack.clientWidth, behavior: 'smooth' }));
const invitationAudio = document.getElementById('invitationAudio');
const audioToggle = document.getElementById('audioToggle');
const audioLabel = audioToggle.querySelector('small');
function updateAudioButton(isPlaying) {
  audioToggle.setAttribute('aria-pressed', String(isPlaying));
  audioToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
  audioToggle.title = isPlaying ? 'Pausar música' : 'Reproducir música';
  audioLabel.textContent = isPlaying ? 'PAUSA' : 'MÚSICA';
  audioToggle.classList.toggle('is-playing', isPlaying);
}
audioToggle.addEventListener('click', async () => {
  if (invitationAudio.paused) {
    try {
      await invitationAudio.play();
      updateAudioButton(true);
    } catch {
      updateAudioButton(false);
    }
  } else {
    invitationAudio.pause();
    updateAudioButton(false);
  }
});
invitationAudio.addEventListener('pause', () => updateAudioButton(false));
