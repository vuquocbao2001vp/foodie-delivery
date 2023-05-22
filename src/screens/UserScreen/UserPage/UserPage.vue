<template>
  <div>
    <h2>Your Address</h2>
    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
      country="vn"
    >
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },

  data: function () {
    return {
      address: null,
      defaultAddress:
        "133 Xuân Thủy, làng Vòng, Dịch Vọng Hậu, Cầu Giấy, Hanoi, Vietnam", // Địa chỉ mặc định của quán
      distance: 0,
    };
  },

  mounted() {
    this.$refs.address.focus();
  },

  methods: {
    async getAddressData(addressData, placeResultData, id) {
      if (addressData && placeResultData && id) {
        this.address = placeResultData.formatted_address;
        console.log(placeResultData.formatted_address);
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [this.defaultAddress],
            destinations: [this.address],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            if (status === window.google.maps.DistanceMatrixStatus.OK) {
              this.distance = response.rows[0].elements[0].distance.value;
              console.log(this.distance);
            } else {
              console.log("Error: " + status);
            }
          }
        );
      }
    },
  },
};
</script>
<style scoped>
.form-control {
  width: 300px;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#map .pac-icon {
  display: none !important;
}
.pac-item {
  padding: 10px !important;
  font-size: 1rem;
  cursor: pointer;
}
.pac-target-input {
  padding: 0 10px;
}
</style>