<style lang="scss">
body {
  background-color: $body-bg-color;
  color: $body-color;
  // background-image: url("/images/v2-bg-noise.png");
  // background-repeat: no-repeat;
  // background-position: center top;
}

.container {
  width: $container-width;
}

section {
  margin-bottom: 6rem;
}

strong {
  color: #000;
}

a, p.disclaimer small a {
  font-weight: bold;
  transition: color .1s, background-color .1s, text-decoration .1s;

  &:hover {
    // color: lighten($link-color, 10%);
    color: #fff;
    background-color: #000;
    text-decoration: none;
  }
}
</style>

<template>
  <div>
    <nuxt/>
    <BFTNFooter/>
  </div>
</template>

<script>
import BFTNFooter from '~/components/BFTNFooter'
import { createMetaTags } from '~/assets/js/helpers'

export default {
  components: {
    BFTNFooter
  },

  head: {
    title: "Join the Battle for Net Neutrality",

    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700'
      }
    ],

    meta: createMetaTags({
      title: "Net Neutrality is *not* dead yet. Call Congress to overrule the FCC vote.",
      description: "Congress can use a Resolution of Disapproval to overrule the FCC. We have to make them.",
      image: "https://www.battleforthenet.com/images/share_images/urgent.png",
      url: "https://www.battleforthenet.com"
    })
  }
}
</script>
