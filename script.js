const sectionConfig = [
  {
    group: "VIP Event",
    sections: [
      {
        id: "vip-event",
        title: "VIP Event",
        assets: [
          { name: "Digital Invitation", file: "vip_digital-invitation.jpg" },
          { name: "30x30 Foam Board", file: "30x30_vip_foam-board.jpg" },
          { name: "PowerPoint", file: "vip_powerpoint.jpg" },
        ],
      },
    ],
  },
  {
    group: "Golf Tournament",
    sections: [
      {
        id: "event-sponsors",
        title: "Event Sponsors — 30x30 Foam Board (Easel)",
        assets: [
          { name: "All Sponsors", file: "30x30_allsponsor.jpg" },
          {
            name: "Presenting Sponsor — High Touch Technologies, Inc.",
            file: "30x30_presenting_high-touch.jpg",
          },
          { name: "19th Hole Sponsor — Farha Roofing", file: "30x30_19th-hole_farha-roofing.jpg" },
          { name: "Breakfast Sponsor — ADS, Inc.", file: "30x30_breakfast_ads.jpg" },
          { name: "Lunch Sponsor — Security 1st", file: "30x30_lunch_security-1st.jpg" },
          { name: "Apparel Sponsor — Under Armour", file: "30x30_apparel_under-armour.jpg" },
          {
            name: "Cigar Experience Sponsor — Cigar Chateau",
            file: "30x30_cigar-experience_cigar-chateau.jpg",
          },
        ],
      },
      {
        id: "special-placement",
        title: "Special Placement Sponsors (Non-Standard)",
        assets: [
          { name: "Beverage Cart — IMA, Inc.", file: "special_beverage-cart_ima.jpg" },
          { name: "Golf Cart — TBD", file: "special_golf-cart_TBD.jpg" },
        ],
      },
      {
        id: "contest-sponsors",
        title: "Contest Sponsors — 30x18 Staked Signs (Title + Logo)",
        assets: [
          { name: "Longest Putt — Dakota Western", file: "30x18_longest-putt_dakota-western.jpg" },
          {
            name: "Longest Drive — Eby Construction Company",
            file: "30x18_longest-drive_eby-construction.jpg",
          },
          { name: "Closest to the Pin — Vornado Air", file: "30x18_closest-to-pin_vornado.jpg" },
          { name: "Buy a Hole-In-One — Farris Mazars", file: "30x18_hole-in-one_farris-mazars.jpg" },
        ],
      },
      {
        id: "corporate-sponsors",
        title: "Corporate Sponsors — 30x18 Staked Signs (Title + Logo)",
        assets: [
          { name: "S.P. Richards Company", file: "30x18_corporate_sp-richards.jpg" },
          { name: "6 Meridian", file: "30x18_corporate_6-meridian.jpg" },
          { name: "LC Industries Foundation", file: "30x18_corporate_lc-industries.jpg" },
          { name: "Allen Exploration", file: "30x18_corporate_allen-exploration.jpg" },
        ],
      },
      {
        id: "hole-sponsors-ace",
        title: "Hole Sponsors — Small Format Signs (24x18) / Ace Sponsors",
        assets: [
          { name: "Belleville Boot Company", file: "24x18_ace_belleville-boot.jpg" },
          { name: "Summit Plastics", file: "24x18_ace_summit-plastics.jpg" },
          { name: "eShipping", file: "24x18_ace_eshipping.jpg" },
          { name: "Patricia A. Peer Window Gallery", file: "24x18_ace_peer-window-gallery.jpg" },
          { name: "PHI Plastics", file: "24x18_ace_phi-plastics.jpg" },
        ],
      },
      {
        id: "hole-sponsors-pin-flag",
        title: "Hole Sponsors — Small Format Signs (24x18) / Pin Flag Sponsors",
        assets: [
          { name: "Hutton", file: "24x18_pin-flag_hutton.jpg" },
          { name: "ADS, Inc.", file: "24x18_pin-flag_ads.jpg" },
        ],
      },
      {
        id: "hole-sponsors-teebox",
        title: "Hole Sponsors — Small Format Signs (24x18) / Tee Box Sponsors",
        assets: [
          { name: "Aloft Hotel Wichita", file: "24x18_teebox_aloft.jpg" },
          { name: "Capital Federal Foundation", file: "24x18_teebox_capitalfederal.jpg" },
          { name: "Enza Financial, LLC", file: "24x18_teebox_enza-financial.jpg" },
          { name: "Pratt Industries", file: "24x18_teebox_pratt-industries.jpg" },
          {
            name: "Wichita State University NIAR",
            file: "24x18_teebox_wichita-state-niar.jpg",
          },
        ],
      },
      {
        id: "hole-sponsors-birdie",
        title: "Hole Sponsors — Small Format Signs (24x18) / Birdie Sponsors",
        assets: [
          { name: "Delta Dental of Kansas", file: "24x18_birdie_delta-dental.jpg" },
          { name: "Envi Environmental", file: "24x18_birdie_envi-environmental.jpg" },
          { name: "IdeaTek", file: "24x18_birdie_ideatek.jpg" },
          { name: "Foulston Siefkin, LLP", file: "24x18_birdie_foulston-siefkin.jpg" },
        ],
      },
      {
        id: "printed-materials",
        title: "Printed Materials (8.5x11)",
        assets: [
          { name: "Mulligan Rules", file: "8.5x11_mulligan-rules.jpg" },
          { name: "Check-In Signs", file: "8.5x11_check-in.jpg" },
        ],
      },
      {
        id: "program",
        title: "Program",
        assets: [
          { name: "Program — Front", file: "program_front.jpg" },
          { name: "Program — Back", file: "program_back.jpg" },
        ],
      },
      {
        id: "day-of-materials",
        title: "Day-Of Materials",
        assets: [{ name: "PowerPoint", file: "day-of_powerpoint.jpg" }],
      },
    ],
  },
];

// Images are committed to the repo root, so asset filenames resolve directly.
const assetRoot = "";
const navRoot = document.getElementById("sidebar-nav");
const contentRoot = document.getElementById("content");
const modal = document.getElementById("asset-modal");
const modalTitle = document.getElementById("modal-title");
const modalPreview = document.getElementById("modal-preview");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

const allAssets = sectionConfig.flatMap((group) => group.sections.flatMap((section) => section.assets));
let activeAssetIndex = -1;

// ---------------------------------------------------------------------------
// Tiles
// ---------------------------------------------------------------------------
const createPlaceholder = (label = "Image not uploaded yet") => {
  const holder = document.createElement("div");
  holder.className = "placeholder";
  holder.textContent = label;
  return holder;
};

const renderTilePreview = (preview, asset) => {
  preview.replaceChildren(createPlaceholder("Loading..."));

  const image = new Image();
  image.loading = "lazy";
  image.alt = asset.name;

  image.addEventListener("error", () => {
    preview.replaceChildren(createPlaceholder());
  });
  image.addEventListener("load", () => {
    preview.replaceChildren(image);
  });

  image.src = `${assetRoot}${asset.file}`;
};

const buildAssetTile = (asset) => {
  const card = document.createElement("div");
  card.className = "tile";

  const preview = document.createElement("div");
  preview.className = "tile-preview";
  preview.setAttribute("role", "button");
  preview.tabIndex = 0;
  preview.setAttribute("aria-label", `Preview ${asset.name}`);

  preview.addEventListener("click", () => openModal(asset));
  preview.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(asset);
    }
  });

  const body = document.createElement("div");
  body.className = "tile-body";

  const title = document.createElement("p");
  title.className = "tile-title";
  title.textContent = asset.name;

  const fileLabel = document.createElement("p");
  fileLabel.className = "tile-file";
  fileLabel.textContent = asset.file;

  body.append(title, fileLabel);
  card.append(preview, body);

  renderTilePreview(preview, asset);
  return card;
};

const buildSection = (section) => {
  const el = document.createElement("section");
  el.className = "section";
  el.id = section.id;

  const heading = document.createElement("h2");
  heading.textContent = section.title;

  const grid = document.createElement("div");
  grid.className = "grid";

  section.assets.forEach((asset) => {
    grid.append(buildAssetTile(asset));
  });

  el.append(heading, grid);
  contentRoot.append(el);
};

const buildNav = () => {
  sectionConfig.forEach((group) => {
    const groupWrap = document.createElement("div");
    groupWrap.className = "nav-group";

    const label = document.createElement("h2");
    label.className = "nav-label";
    label.textContent = group.group;

    const list = document.createElement("ul");
    list.className = "nav-list";

    group.sections.forEach((section) => {
      buildSection(section);

      const item = document.createElement("li");
      item.className = "nav-item";

      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = `#${section.id}`;
      link.dataset.target = section.id;
      link.textContent = section.title;

      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(section.id).scrollIntoView({ behavior: "smooth", block: "start" });
      });

      item.append(link);
      list.append(item);
    });

    groupWrap.append(label, list);
    navRoot.append(groupWrap);
  });
};

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
const renderModalAsset = (asset) => {
  modalTitle.textContent = asset.name;
  modalPreview.replaceChildren(createPlaceholder("Loading..."));

  const fullImage = new Image();
  fullImage.alt = asset.name;

  fullImage.addEventListener("error", () => {
    modalPreview.replaceChildren(createPlaceholder(`Missing image: ${asset.file}`));
  });
  fullImage.addEventListener("load", () => {
    modalPreview.replaceChildren(fullImage);
  });

  fullImage.src = `${assetRoot}${asset.file}`;
};

const updateModalNavigation = () => {
  modalPrev.disabled = activeAssetIndex <= 0;
  modalNext.disabled = activeAssetIndex >= allAssets.length - 1;
};

const openModalByIndex = (index) => {
  activeAssetIndex = index;
  renderModalAsset(allAssets[activeAssetIndex]);
  updateModalNavigation();

  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

const openModal = (asset) => {
  const nextIndex = allAssets.findIndex((item) => item.file === asset.file);
  if (nextIndex === -1) return;
  openModalByIndex(nextIndex);
};

const stepModalAsset = (step) => {
  const nextIndex = activeAssetIndex + step;
  if (nextIndex < 0 || nextIndex >= allAssets.length) return;
  openModalByIndex(nextIndex);
};

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
  activeAssetIndex = -1;
};

const setupActiveNavigation = () => {
  const links = [...document.querySelectorAll(".nav-link")];
  const map = new Map(links.map((link) => [link.dataset.target, link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.remove("active"));
          map.get(entry.target.id)?.classList.add("active");
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px", threshold: 0.1 }
  );

  document.querySelectorAll(".section").forEach((section) => observer.observe(section));
};

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", () => stepModalAsset(-1));
modalNext.addEventListener("click", () => stepModalAsset(1));
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") return closeModal();
  if (event.key === "ArrowLeft") stepModalAsset(-1);
  if (event.key === "ArrowRight") stepModalAsset(1);
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
buildNav();
setupActiveNavigation();
