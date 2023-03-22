<template>
  <div>
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title
            >List All Countries
            <v-spacer></v-spacer>
            <v-text-field
              v-model="myName"
              label="Search by Name"
              single-line
              hide-details
            ></v-text-field>
            <v-btn small @click="searchByName"> Search </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="myCountries"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
          >
            <template v-slot:[`item.flags.png`]="props">
              <img
                :src="props.item.flags.png"
                alt="props.item.flags.png"
                style="width: 50px"
              />
            </template>
            <template v-slot:[`item.name.official`]="props">
              <v-btn class="mt-2 text-capitalize" plain text @click="clickByName(props)">
                {{ props.item.name.official }}
              </v-btn>
            </template>
          </v-data-table>
          <v-row class="text-center px-4 align-center" wrap>
            <v-col class="text-truncate" cols="12" md="3">
              Total {{ totalRecords }} records
            </v-col>
            <v-col cols="12" md="6">
              <v-pagination v-model="page" :length="pageCount"> </v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="text-h5"> Country Detail </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <label>Flag:  
                <img :src="tmpData?.item?.flags?.png" alt="tmpData?.item?.flags?.png" style="width: 30px"/>
              </label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>Country Name: <strong class="txt">{{ tmpData?.item?.name?.official }}</strong></label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>2 character Country Code: <strong class="txt">{{ tmpData?.item?.cca2 }}</strong></label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>3 character Country Code: <strong class="txt">{{ tmpData?.item?.cca3 }}</strong></label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>Native Country Name: <strong class="txt">{{ tmpData?.item?.name?.nativeName?.zho?.official }}</strong></label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>Alternative Country Name: <strong class="txt">{{ tmpData?.item?.altSpellings }}</strong></label>
            </v-col>
            <v-col cols="12" sm="12">
              <label>Country Calling Codes: <strong class="txt">{{ tmpData?.item?.idd?.root }}</strong></label>
            </v-col>
          </v-row> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  created() {
    this.getCountries();
  },
  data() {
    return {
      dialog: false,
      countries: [],
      myCountries: this.countries,
      myName: "",
      headers: [
        { text: "Flags", align: "start", sortable: false, value: "flags.png" },
        { text: "Country Name", align: "start", value: "name.official" },
        {
          text: "2 character Country Code",
          sortable: false,
          align: "start",
          value: "cca2",
        },
        {
          text: "3 character Country Code",
          sortable: false,
          align: "start",
          value: "cca3",
        },
        {
          text: "Native Country Name",
          align: "start",
          sortable: false,
          value: "name.nativeName.zho.official",
        },
        {
          text: "Alternative Country Name",
          align: "start",
          sortable: false,
          value: "altSpellings",
        },
        {
          text: "Country Calling Codes",
          align: "start",
          sortable: false,
          value: "idd.root",
        },
      ],
      page: 1,
      itemsPerPage: 25,
      tmpData: {},
    };
  },
  computed: {
    totalRecords() {
      return this.countries.length;
    },
    pageCount() {
      const count = Math.ceil((this.myCountries?.length ?? 0) / this.itemsPerPage);
      return count;
    },
  },
  methods: {
    // array filter search
    searchByName() {
      var re = new RegExp(this.myName + ".+$", "i");
      this.myCountries = this.countries.filter((e)=> {
        return (e.name.official.search(re) != -1 || e.name.official.toLowerCase() == this.myName.toLowerCase());
      });
    },
    clickByName(item) {
      this.tmpData = item;
      this.dialog = true;
    },
    async getCountries() {
      try {
        const countries = await axios.get(
          "https://restcountries.com/v3.1/all?page=1&per_page=250"
        );
        // list old countries
        this.countries = countries.data;

        // list new countries
        this.myCountries = this.countries;
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style scoped>
  .txt {
    color:black;
  }
</style>
