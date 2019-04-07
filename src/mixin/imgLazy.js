import lozad from 'lozad';
export default {
  mounted () {
    this.observeLozad();
  },
  methods: {
    observeLozad () {
      const lozadElements = document.querySelectorAll('.lozad');
      if (!lozadElements || !lozadElements.length) {
        return false;
      };
      const lozadObserver = lozad(lozadElements, {
        loaded: element => element.classList.add('loaded')
      });
      lozadObserver.observe();
    }
  },
  updated () {
    this.observeLozad();
  }
};
