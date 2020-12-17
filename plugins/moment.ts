import moment from 'moment';

export default ({ app }, inject) => {
    inject('moment', stringDate => moment(stringDate, 'DD/MM/YYYY'));
};

//
// Vue Prototype Injections
//
declare module 'vue/types/vue' {
    interface Vue {
      readonly $moment: (stringDate: string) => moment.Moment
    }
}
