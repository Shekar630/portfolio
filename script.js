const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader?.classList.add('hide');
  }, 600);
});


/* =========================
   NAVIGATION
========================= */

const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-btn');


/* =========================
   MOBILE MENU TOGGLE
========================= */

menu?.addEventListener('click', () => {

  const isOpen =
    nav?.classList.toggle('menu-open');

  menu.classList.toggle(
    'active',
    isOpen
  );

  menu.setAttribute(
    'aria-expanded',
    isOpen ? 'true' : 'false'
  );

});


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

document
  .querySelectorAll('.nav-links a')
  .forEach(a => {

    a.addEventListener('click', () => {

      nav?.classList.remove(
        'menu-open'
      );

      menu?.classList.remove(
        'active'
      );

      menu?.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });


/* =========================
   NAV SCROLL
========================= */

window.addEventListener(
  'scroll',
  () => {

    nav?.classList.toggle(
      'scrolled',
      window.scrollY > 40
    );

  },
  { passive: true }
);


/* =========================
   REVEAL ANIMATION
========================= */

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(e => {

      if (e.isIntersecting) {

        e.target.classList.add(
          'visible'
        );

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll('.reveal')
  .forEach(el => {

    observer.observe(el);

  });


/* =========================
   YEAR
========================= */

const yearElement =
  document.getElementById('year');

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================
   SERVICE MEDIA
========================= */

const serviceMedia = {

  video: {

    videos: [
      'media/video-1.mp4',
      'media/video-2.mp4',
      'media/video-3.mp4'
    ],

    note:
      'Video Editing — 3 sample edits. Use arrows or thumbnails to switch.'

  },


  wedding: {

    videos: [
      'media/wedding-1.mp4',
      'media/wedding-2.mp4',
      'media/wedding-3.mp4'
    ],

    note:
      'Wedding Films — sample edits. Use arrows or thumbnails to switch.'

  },


  reels: {

    videos: [
      'media/reels-1.mp4',
      'media/reels-2.mp4',
      'media/reels-3.mp4'
    ],

    note:
      'Instagram Reels — 3 sample edits. Use arrows or thumbnails to switch.'

  },


  brand: {

    videos: [
      'media/brand-1.mp4'
    ],

    note:
      'Brand Content — sample edits. Use arrows or thumbnails to switch.'

  },


  birthday: {

    videos: [
      'media/birthday-1.mp4',
      'media/birthday-2.mp4',
      'media/birthday-3.mp4'
    ],

    note:
      'Birthday Events — 3 sample edits. Use arrows or thumbnails to switch.'

  },


  special: {

    videos: [
      'media/special-1.mp4',
      'media/special-2.mp4',
      'media/special-3.mp4'
    ],

    note:
      'Special Occasion Video Editing — 3 sample edits. Use arrows or thumbnails to switch.'

  }

};


/* =========================
   VIDEO MODAL
========================= */

const modal =
  document.getElementById('videoModal');

const modalTitle =
  document.getElementById('modalTitle');

const modalKicker =
  document.getElementById('modalKicker');

const modalNote =
  document.getElementById('modalNote');


const mainVideo =
  document.getElementById('mainVideo');

const mainDriveVideo =
  document.getElementById('mainDriveVideo');

const mainPlayBtn =
  document.getElementById('mainPlayBtn');


const thumbsContainer =
  document.getElementById('galleryThumbs');


const prevBtn =
  document.querySelector('.gallery-prev');

const nextBtn =
  document.querySelector('.gallery-next');


/* =========================
   GLOBAL VIDEO CONTROL
   ONLY ONE VIDEO PLAYS
========================= */

function pauseAllVideosExcept(currentVideo) {

  document
    .querySelectorAll('video')
    .forEach(video => {

      if (video !== currentVideo) {

        video.pause();

      }

    });

}


/* =========================
   GLOBAL PLAY LISTENER
   WORK + MODAL VIDEOS
========================= */

document.addEventListener(
  'play',
  event => {

    const currentVideo =
      event.target;

    if (
      currentVideo instanceof HTMLVideoElement
    ) {

      pauseAllVideosExcept(
        currentVideo
      );

    }

  },
  true
);


/* =========================
   STOP ALL NORMAL VIDEOS
   WHEN MODAL OPENS
========================= */

function stopAllNormalVideos() {

  document
    .querySelectorAll('video')
    .forEach(video => {

      video.pause();

    });

}


/* =========================
   MODAL PLAY BUTTON
========================= */

function showPlayBtn() {

  mainPlayBtn?.classList.remove(
    'is-hidden'
  );

}


function hidePlayBtn() {

  mainPlayBtn?.classList.add(
    'is-hidden'
  );

}


mainPlayBtn?.addEventListener(
  'click',
  e => {

    e.stopPropagation();

    if (!mainVideo) return;

    pauseAllVideosExcept(
      mainVideo
    );

    mainVideo.muted = false;

    mainVideo.controls = true;


    mainVideo
      .play()
      .then(() => {

        hidePlayBtn();

      })
      .catch(() => {

        showPlayBtn();

      });

  }
);


/* =========================
   ALWAYS SHOW NATIVE CONTROLS
========================= */

if (mainVideo) {

  mainVideo.controls = true;

}


/* =========================
   KEEP MODAL PLAY BUTTON SYNCED
========================= */

mainVideo?.addEventListener(
  'play',
  hidePlayBtn
);

mainVideo?.addEventListener(
  'pause',
  showPlayBtn
);

mainVideo?.addEventListener(
  'ended',
  showPlayBtn
);


/* =========================
   VIDEO GALLERY
========================= */

let currentVideos = [];

let currentIndex = 0;

let currentService = '';


function setMainVideo(index) {

  if (!currentVideos.length) return;


  currentIndex =
    (index + currentVideos.length) %
    currentVideos.length;


  const src =
    currentVideos[currentIndex];


  /* =========================
     INSTAGRAM REELS 9:16
  ========================= */

  const videoWrap =
    mainVideo?.closest(
      '.video-wrap'
    );


  if (videoWrap) {

    videoWrap.classList.toggle(
      'instagram-video',
      currentService === 'reels'
    );

  }


  /* =========================
     DRIVE VIDEO CHECK
  ========================= */

  const isDriveVideo =
    src.includes(
      'drive.google.com/file/'
    ) &&
    src.includes('/preview');


  /* =========================
     STOP NORMAL VIDEO
  ========================= */

  if (mainVideo) {

    mainVideo.pause();

    mainVideo.currentTime = 0;

  }


  /* =========================
     GOOGLE DRIVE VIDEO
  ========================= */

  if (isDriveVideo) {

    if (mainVideo) {

      mainVideo.style.display =
        'none';

    }


    mainPlayBtn?.classList.add(
      'is-hidden'
    );


    if (mainDriveVideo) {

      mainDriveVideo.style.display =
        'block';

      mainDriveVideo.src = src;

    }

  }


  /* =========================
     NORMAL VIDEO
  ========================= */

  else {

    if (mainDriveVideo) {

      mainDriveVideo.src = '';

      mainDriveVideo.style.display =
        'none';

    }


    if (mainVideo) {

      mainVideo.style.display =
        'block';


      const source =
        mainVideo.querySelector(
          'source'
        );


      if (source) {

        source.src = src;

      } else {

        mainVideo.src = src;

      }


      mainVideo.load();

      mainVideo.muted = false;

      showPlayBtn();

    }

  }


  /* =========================
     ACTIVE THUMBNAIL
  ========================= */

  thumbsContainer
    ?.querySelectorAll(
      '.gallery-thumb'
    )
    .forEach((thumb, i) => {

      thumb.classList.toggle(
        'is-active',
        i === currentIndex
      );

    });

}


/* =========================
   BUILD THUMBNAILS
========================= */

function buildThumbs() {

  if (!thumbsContainer) return;


  thumbsContainer.innerHTML = '';


  currentVideos.forEach(
    (src, i) => {

      const thumb =
        document.createElement(
          'button'
        );


      thumb.type = 'button';


      thumb.className =
        'gallery-thumb' +
        (i === 0
          ? ' is-active'
          : '');


      thumb.setAttribute(
        'aria-label',
        'Sample ' + (i + 1)
      );


      /* =========================
         GOOGLE DRIVE THUMBNAIL
      ========================= */

      if (
        src.includes(
          'drive.google.com/file/'
        ) &&
        src.includes('/preview')
      ) {

        const frame =
          document.createElement(
            'iframe'
          );


        frame.src = src;


        frame.title =
          'Wedding film sample ' +
          (i + 1);


        frame.setAttribute(
          'allow',
          'autoplay; fullscreen'
        );


        frame.setAttribute(
          'allowfullscreen',
          ''
        );


        frame.style.cssText =
          'width:100%;height:100%;border:0;pointer-events:none;';


        thumb.appendChild(frame);

      }


      /* =========================
         NORMAL VIDEO THUMBNAIL
      ========================= */

      else {

        const vid =
          document.createElement(
            'video'
          );


        vid.muted = true;

        vid.playsInline = true;

        vid.preload = 'metadata';

        vid.src = src;


        vid.addEventListener(
          'loadeddata',
          () => {

            try {

              vid.currentTime =
                0.5;

            } catch (_) {}

          }
        );


        thumb.appendChild(vid);

      }


      /* =========================
         THUMBNAIL CLICK
      ========================= */

      thumb.addEventListener(
        'click',
        () => {

          setMainVideo(i);

        }
      );


      thumbsContainer.appendChild(
        thumb
      );

    }
  );

}


/* =========================
   OPEN MODAL
========================= */

function openModal(
  service,
  title
) {

  stopAllNormalVideos();


  const data =
    serviceMedia[service] ||
    serviceMedia.video;


  currentService =
    service;


  currentVideos =
    data.videos || [];


  currentIndex = 0;


  if (modalTitle) {

    modalTitle.textContent =
      title;

  }


  if (modalKicker) {

    modalKicker.textContent =
      '';

  }


  if (modalNote) {

    modalNote.textContent =
      data.note;

  }


  buildThumbs();

  setMainVideo(0);

  showPlayBtn();


  modal?.classList.add(
    'is-open'
  );


  modal?.setAttribute(
    'aria-hidden',
    'false'
  );


  document.body.classList.add(
    'modal-open'
  );

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  if (mainVideo) {

    mainVideo.pause();

    mainVideo.currentTime = 0;

  }


  if (mainDriveVideo) {

    mainDriveVideo.src = '';

    mainDriveVideo.style.display =
      'none';

  }


  if (mainVideo) {

    mainVideo.style.display =
      'block';

  }


  /* =========================
     REMOVE INSTAGRAM 9:16 CLASS
  ========================= */

  const videoWrap =
    mainVideo?.closest(
      '.video-wrap'
    );


  if (videoWrap) {

    videoWrap.classList.remove(
      'instagram-video'
    );

  }


  currentService = '';

  showPlayBtn();


  modal?.classList.remove(
    'is-open'
  );


  modal?.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.classList.remove(
    'modal-open'
  );

}


/* =========================
   GALLERY ARROWS
========================= */

prevBtn?.addEventListener(
  'click',
  () => {

    setMainVideo(
      currentIndex - 1
    );

  }
);


nextBtn?.addEventListener(
  'click',
  () => {

    setMainVideo(
      currentIndex + 1
    );

  }
);


/* =========================
   SERVICE BUTTONS
========================= */

document
  .querySelectorAll(
    '.service-trigger'
  )
  .forEach(btn => {

    btn.addEventListener(
      'click',
      () => {

        openModal(
          btn.dataset.service,
          btn.dataset.title ||
            'Service'
        );

      }
    );

  });


/* =========================
   MODAL CLOSE
========================= */

modal
  ?.querySelector(
    '.video-modal-close'
  )
  ?.addEventListener(
    'click',
    closeModal
  );


modal
  ?.querySelector(
    '.video-modal-backdrop'
  )
  ?.addEventListener(
    'click',
    closeModal
  );


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  'keydown',
  e => {

    if (
      !modal?.classList.contains(
        'is-open'
      )
    ) {

      return;

    }


    if (e.key === 'Escape') {

      closeModal();

    }


    if (e.key === 'ArrowLeft') {

      setMainVideo(
        currentIndex - 1
      );

    }


    if (e.key === 'ArrowRight') {

      setMainVideo(
        currentIndex + 1
      );

    }

  }
);


/* =========================
   WORK SECTION
   SHOW VIDEO FRAME
   PLAY / PAUSE
========================= */

document
  .querySelectorAll(
    '.slide-card'
  )
  .forEach(card => {

    const video =
      card.querySelector(
        'video'
      );


    const playButton =
      card.querySelector(
        '.slide-play'
      );


    const icon =
      playButton?.querySelector(
        'i'
      );


    if (
      !video ||
      !playButton ||
      !icon
    ) {

      return;

    }


    /* =========================
       SHOW VIDEO FRAME
    ========================= */

    video.preload = 'auto';


    video.addEventListener(
      'loadedmetadata',
      () => {

        try {

          video.currentTime =
            0.5;

        } catch (_) {}

      }
    );


    video.addEventListener(
      'loadeddata',
      () => {

        try {

          if (
            video.currentTime === 0
          ) {

            video.currentTime =
              0.5;

          }

        } catch (_) {}

      }
    );


    /* =========================
       UPDATE PLAY BUTTON
    ========================= */

    function updatePlayButton() {

      if (video.paused) {

        icon.classList.remove(
          'fa-pause'
        );

        icon.classList.add(
          'fa-play'
        );

      } else {

        icon.classList.remove(
          'fa-play'
        );

        icon.classList.add(
          'fa-pause'
        );

      }

    }


    /* =========================
       PLAY / PAUSE BUTTON
    ========================= */

    playButton.addEventListener(
      'click',
      e => {

        e.preventDefault();

        e.stopPropagation();


        if (video.paused) {

          video
            .play()
            .catch(() => {});

        } else {

          video.pause();

        }

      }
    );


    /* =========================
       VIDEO PLAY
    ========================= */

    video.addEventListener(
      'play',
      updatePlayButton
    );


    /* =========================
       VIDEO PAUSE
    ========================= */

    video.addEventListener(
      'pause',
      updatePlayButton
    );


    /* =========================
       VIDEO ENDED
    ========================= */

    video.addEventListener(
      'ended',
      updatePlayButton
    );


    /* =========================
       INITIAL ICON
    ========================= */

    updatePlayButton();

  });


/* =========================
   MOBILE SERVICES CARD
   CLICK GLOW EFFECT
========================= */

if (window.innerWidth <= 650) {

  document
    .querySelectorAll(
      '.services .svc-card'
    )
    .forEach(card => {

      card.addEventListener(
        'click',
        () => {

          card.classList.toggle(
            'card-active'
          );

        }
      );

    });

}