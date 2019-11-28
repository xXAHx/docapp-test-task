<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="(form, index) in forms" :key="form.id">
                <a class="nav-link" href="#"
                   v-bind:key="form.id"
                   v-bind:class="{active: currentTab === index}"
                   v-on:click="currentTab = index"
                >
                    {{ form.short_title }}
                </a>
            </li>
        </ul>
        <div class="tab-content py-4">
            <div class="tab tab-pane"
                 v-for="(form, index) in forms"
                 :key="form.id"
                 :class="{active: currentTab === index}"
            >
                <ul>
                    <li v-for="(item, index) in form.details" :key="index">
                        {{ item.content }}
                        <div class="form-check" v-if="item.need_initials">
                            <template v-if="needSign.includes(`form-${form.id}-${index}`)">
                                <span class="patient-initials">
                                    {{ patient }}
                                </span>
                            </template>
                            <template v-else>
                                <input class="form-check-input" type="checkbox"
                                       :value="`form-${form.id}-${index}`"
                                       :id="`form-${form.id}-${index}`"
                                       v-model="needSign"
                                >
                            </template>
                            <label class="form-check-label" :for="`form-${form.id}-${index}`">
                                I certify that I read and write English and have read and fully understand this consent for surgery.
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormTabs",
        props: ['forms', 'patient'],
        data() {
            return {
                currentTab: 0,
                tabs: [],
                needSign: []
            }
        },
    }
</script>

<style scoped>
    .patient-initials {
        font-weight: bold;
    }
    .form-check-label {
        display: inline;
    }
</style>