<template>
    <dateTimePicker
        ref="datePicker"
        v-model="selectedDate"
        name="date"
        :config="selectedOptions"
        @dp-show="onShow"
        @dp-change="onChange"
        @dp-update="onUpdate"
    ></dateTimePicker>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import dateTimePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

@Component({
    components: {
        dateTimePicker
    }
})
export default class DateTimePickerComponent extends Vue {
    @Prop() value!: Date;
    @Prop() customOptions!: any;
    @Prop() displayTime!: boolean;
    @Prop() timeZone!: string;
    @Prop() formatDate!: string;

    set selectedDate(value: Date) {
        this.$emit('input', value);
    }

    get selectedDate() {
        return this.value;
    }

    defaultFormatDate: string = "DD/MM/YYYY";
    get formatDateTime(): string {
        return this.formatDate ? this.formatDate : this.defaultFormatDate;
    }

    defaultOptions: any = {
        useCurrent: false,
        format: this.formatDateTime
    }

    get selectedOptions() {
        return {
            ...this.defaultOptions,
            ...this.customOptions
        };
    }

    onShow() {
        this.$emit('show');
    }

    onChange(event) {
        this.$emit('change', event);
    }

    onUpdate(event) {
        this.$emit('update', event);
    }
}
</script>
