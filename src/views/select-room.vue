<template>
  <div class="select">
    <form novalidate @submit.prevent="validateUser">
    <md-card>
      <md-card-content>
        <md-field :class="getValidationClass('roomid')">
        <label for="room-id">请输入房间号</label>
        <md-input name="room-id" id="room-id" autocomplete="off" v-model="form.roomid"
                  :disabled="sending"/>
        <span class="md-error" v-if="!$v.form.roomid.required">请输入房间号</span>
        </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

      <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">进入</md-button>
      </md-card-actions>
    </md-card>
    </form>

  </div>
</template>
<script>
  import {validationMixin} from 'vuelidate';
  import {required} from 'vuelidate/lib/validators';

  import handler from '../libs/connect';

  export default {
      name: 'selectRoom',
      mixins: [validationMixin],
      data: () => ({
          form: {
              roomid: '',
          },

          sending: false,
      }),
      validations: {
          form: {
              roomid: {
                  required,
              },
          },
      },
      methods: {
          getValidationClass(fieldName) {
              const field = this.$v.form[fieldName];

              if (field) {
                  return {
                      'md-invalid': field.$invalid && field.$dirty,
                  };
              }
          },
          validateUser() {
              this.$v.$touch();

              if (!this.$v.$invalid) {
                  this.enterRoom();
              }
          },
          async enterRoom() {
              this.sending = true;
              console.log(this.form);
              const roomid = this.form.roomid;
              // let stream = await handler.getMedia();
              // if (!stream.errorMsg) {
                  this.$router.push(
                      {
                          name: 'room',
                          params: {
                              roomid,
                          },
                      },
                  );
              // }
              this.sending = false;

          },
      },
  };
</script>