<template>
<div class="about">
    <form @submit.prevent>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" @click="addClick">Add New Record</button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 style="width: 20%; float: left;">{{modalTitle}}</h4>
                        <button type="button" id="close" style="width: 5%; float:right; margin-top: 4px;" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <span style="float: left;">Name</span>
                        <input type="text" v-model="name" placeholder="Enter Name" />
                        <span style="float: left;">Description</span>
                        <input type="text" v-model="description" placeholder="Enter Description" />
                        <span style="float: left;">Fee</span>
                        <input type="text" v-model="issuing_fee" placeholder="Enter Fee" />
                    </div>
                    <div class="modal-footer">
                        <!-- <button style="background-color: lightskyblue;" type="submit">login</button> -->
                        <button type="submit" v-if="pccid == 0" v-on:click="add" style="background-color: lightskyblue;" class="btn btn-default">Add</button>
                        <button type="submit" v-if="pccid != 0" @click="editpcc" style="background-color: lightskyblue;" class="btn btn-default">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <table>
        <tr>
            <th style="text-align: center;"><input type="checkbox" v-model="selectall"/> </th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
        <tr v-for="pcc in pccList" :key="pcc.id">
            <td style="text-align: center;"><input type="checkbox" :value="pcc.id" v-model="checked"/> </td>
            <td>{{pcc.name}}</td>
            <td>{{pcc.description}}</td>
            <td>{{pcc.issuing_fee}}</td>
            <td style="width: 23rem;">
                <input type="submit" style="border-color: none;  height: 3rem; width: 10rem; background-color:aqua;" value="Edit" data-toggle="modal" data-target="#myModal" @click="editClick(pcc)" />
                <input type="submit" @click="openmodal" :id="pcc.id" style="border-color: none; margin-left: 2px; height: 3rem; width: 10rem; background-color:red;" value="Delete" data-toggle="modal" data-target="#myModal1" />
                <!-- Modal -->
                <div class="modal fade" id="myModal1" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 style="width: 10%; float: left;">PCCS</h4>
                                <button type="button" id="close1" style="width: 5%; float:right; margin-top: 4px;" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body text-center">
                                <strong>Are you sure you want to delete ?</strong>
                            </div>
                            <div class="modal-footer">
                                <button style="background-color: lightskyblue; width: 12%;" class="btn btn-default" @click="del">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <input type="submit" value="Logout" style=" margin-right: 2rem; margin-top: 3rem; float:right; border-color: none; height: 3rem; width: 10rem; background-color:cadetblue;" @click="logout" />
    <input type="submit" v-if="checked.length > 1" style=" margin-right: 2rem; margin-top: 3rem; float:right; border-color: none; height: 3rem; width: 10rem; background-color:red;" value="Delete Bulk" @click="delrecords"/>
    <div class="wrapper">
        <div id="toast">
            <div class="container-1">
                <i class="fas fa-check-square"></i>
            </div>
            <div class="container-2" v-if="pccid == 0" style="text-align: left;">
                <strong class="str">Record Added successfully</strong>    
            </div>
            <div class="container-2" v-if="pccid != 0" style="text-align: left;">
                <strong class="str">Record Edited successfully</strong>   
            </div>    
        </div>
    </div>
     <div class="wrapper">
        <div id="toast1">
            <div class="container-1">
                <i class="fa-solid fa-trash-can"></i>
            </div>
            <div class="container-2" style="text-align: left;">
                <strong class="str">Record Deleted successfully</strong>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pccList: [],
            name: '',
            description: '',
            issuing_fee: '',
            pccid: 0,
            modalTitle: '',
            checked:[],
            selectall:false,
            Selected:'',
        }
    },
    async mounted() {
        this.getall();
    },
    watch:{
        selectall:function(value){
            if(!value){
                this.checked = [];
            }else{
                this.pccList.forEach(element => {
                // if (element.isSelected == true) {
                    this.checked.push(element.id);
                }) 
            }
        }
    },    
    methods: {
        async getall() {
            const res = await axios.get('/pcc');
            this.pccList = res.data.data.data;
        },
        addClick() {
            this.modalTitle = "Add Pcc";
            this.pccid = 0;
            this.name = "";
            this.description = "";
            this.issuing_fee = "";
        },
        editClick(pcc) {
            this.modalTitle = "Edit Pcc";
            this.pccid = pcc.id;
            this.name = pcc.name;
            this.description = pcc.description;
            this.issuing_fee = pcc.issuing_fee;
        },
        async add() {
            await axios.post('/pcc', {
                name: this.name,
                description: this.description,
                issuing_fee: this.issuing_fee,
            });
            document.getElementById('close').click();
            this.showToast();
            this.getall();
        },
        del() {
            axios.delete('/pcc/' + this.pccid);
            this.getall();
            this.deleteToast();
            document.getElementById('close1').click();
        },
        editpcc() {
            axios.patch('/pcc/' + this.pccid, {
                name: this.name,
                description: this.description,
                issuing_fee: this.issuing_fee,
            });
            this.getall();
            this.showToast();
            document.getElementById('close').click();
        },
        openmodal(e) {
            this.pccid = e.target.id;
        },
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
        showToast(x) {
            clearTimeout(x);
            document.getElementById("toast").style.transform = "translateX(0)";
            x = setTimeout(() => {
                document.getElementById("toast").style.transform = "translateX(400px)"
            }, 6000);
        },
        deleteToast(x) {
            clearTimeout(x);
            document.getElementById("toast1").style.transform = "translateX(0)";
            x = setTimeout(() => {
                document.getElementById("toast1").style.transform = "translateX(400px)"
            }, 6000);
        },
        delrecords(){
            let ids = this.checked;
            axios.post('/pcc-deletes', { ids: ids })
            .then((response)=>{
                if(response.status == 200){
                    this.getall();
                    this.checked=[];
                }
            });
        },
    },
}
</script>

<style src="../assets/style.css"/>
<style src="../assets/toast.css"/>
