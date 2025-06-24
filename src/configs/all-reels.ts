interface Reel {
  video: string;
  poster: string;
}

const reels: Reel[] = [
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/acoustic-nest.mp4",
    poster: "/images/reel_poster/acousticnest.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/adxel.mp4",
    poster: "/images/reel_poster/adxel.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/thumbnail/reels/aerocide.mp4",
    poster: "/images/reel_poster/aerocide.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/ambrosia-harvest.mp4",
    poster: "/images/reel_poster/ambrosia.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/anp-bee.mp4",
    poster: "/images/reel_poster/anpbee.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/cmed-2.mp4",
    poster: "/images/reel_poster/cmed_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/glow-green.mp4",
    poster: "/images/reel_poster/glowgreen.png",
  },
  {
    video:
      "https://jaikvik.in/lab/new-post-video/reels-1/gurgaon-packaging.mp4",
    poster: "/images/reel_poster/ggnpackaging.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/indian-roller.mp4",
    poster: "/images/reel_poster/indianroller.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/luvfins.mp4",
    poster: "/images/reel_poster/luvfins.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/regent.mp4",
    poster: "/images/reel_poster/reagent.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-1/satya.mp4",
    poster: "/images/reel_poster/satya.png",
  },
  {
    video:
      "https://jaikvik.in/lab/new-post-video/thumbnail/reels/shree-ram-enterprises.mp4",
    poster: "/images/reel_poster/shreeram.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/cmed.mp4",
    poster: "/images/reel_poster/cmed.png",
  },
  {
    video:
      "https://jaikvik.in/lab/new-post-video/reels-1/ambrosia-harvest-2.mp4",
    poster: "/images/reel_poster/ambrosia_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/thumbnail/reels/amx.mp4",
    poster: "/images/reel_poster/amx.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/anaansh.mp4",
    poster: "/images/reel_poster/anaansh.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/celestial.mp4",
    poster: "/images/reel_poster/celestail.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/envirotech.mp4",
    poster: "/images/reel_poster/envirotech.png",
  },
  {
    video:
      "https://jaikvik.in/lab/new-post-video/thumbnail/reels/fun-twist.mp4",
    poster: "/images/reel_poster/funtwist.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/glow-green.mp4",
    poster: "/images/reel_poster/glowgreen_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/gutaderme.mp4",
    poster: "/images/reel_poster/gutaderme.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/my-brand-please.mp4",
    poster: "/images/reel_poster/mybrandplese.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/radicon-3.mp4",
    poster: "/images/reel_poster/radicon_3.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/newtach.mp4",
    poster: "/images/reel_poster/newtechsteel.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/radicon.mp4",
    poster: "/images/reel_poster/radicon_4.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/regent-2.mp4",
    poster: "/images/reel_poster/reagent_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/shree-ram-2.mp4",
    poster: "/images/reel_poster/shreeram_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/smd.mp4",
    poster: "/images/reel_poster/smd.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/uni-spares.mp4",
    poster: "/images/reel_poster/uni_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/thumbnail/reels/vinama.mp4",
    poster: "/images/reel_poster/vinama.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/envirotech-2.mp4",
    poster: "/images/reel_poster/envirotech.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/glow-green-2.mp4",
    poster: "/images/reel_poster/glowgreen.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/radicon-2.mp4",
    poster: "/images/reel_poster/radicon_3.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/glow-green-3.mp4",
    poster: "/images/reel_poster/glowgreen_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/uni-spares-2.mp4",
    poster: "/images/reel_poster/uni_2.png",
  },
  {
    video: "https://jaikvik.in/lab/new-post-video/reels-2/radicon-4.mp4",
    poster: "/images/reel_poster/radicon.png",
  },
];

export default reels;
