<script>
import ConversationsItem from './ConversationsItem.vue';
//import ConversationsSearch from './ConversationsSearch.vue';

export default {
    data () {
        return {
            conversations: [],
            conversationsAux: [],
            loading: false,
            query: ''
        };
    },
    methods: {
        pesquisar: function () {

            let aux = [];
            if( this.query != null && this.query != undefined && this.query != '' && this.conversationsAux != undefined ){
                let quantidade = this.conversationsAux.length;  
                for (var i= 0; i < quantidade; i++ ) {
                    if( this.conversationsAux[i].nome.toUpperCase().indexOf(this.query.toUpperCase()) > -1 ){
                         aux.push( this.conversationsAux[i] );   
                    }
                };
                this.conversations = aux;
            }else{
                this.getConversations()
            }
        },
        getConversations: function () {
            
            let usuario = this.$localStorage.get('usuario')

           if( usuario != null &&  usuario.idEmpresa != null){  
                
                let self = this
                this.loading = true;
                this.conversations = []
                this.$http.get('/pontoMonitorado/empresa/' +  usuario.idEmpresa)    
                .then(response => {
                    self.loading = false;
                    self.conversations = response.data;
                    self.conversationsAux =  this.conversations
                }).catch(e => {
                    self.$notify({
                    message:
                        "Lamentamos, mas ocorreu um erro na sua solicitação",
                        icon: "add_alert",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'danger'
                    });
                })
                
            }
           
        }
    },
    beforeMount() {
        this.getConversations();
    },
    mounted() {
        /*
        setInterval(
            () => {
                this.getConversations()
            }, 
            1000 * 60 * 10
        );
        */
    },
    components: {
        ConversationsItem
        //ConversationsSearch
    }
}
</script>

<template>
    <aside class="conversations-page">
        <div class="conversations-header">
             <div class="dialogs-search">
                <input type="search" v-model="query" v-on:keyup="pesquisar" class="dialogs-search__field" placeholder="Pesquisar">
            </div>
            <!--
            <conversations-search></conversations-search>
            -->
             <!--
            <button class="menu-button"></button>
            -->
        </div>
        
        <div v-if="loading" class="spinner"></div>
        <transition-group v-else tag="div" class="conversations-list" name="fade">
            <conversations-item
                v-for="dialog in conversations"
                :dialog="dialog"
                :key="dialog.identificador"
            ></conversations-item>
        </transition-group>
    </aside>
</template>

<style>
.conversations-page {
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e4e6e9;
	flex-shrink: 0;
    flex-grow: 0;
    width: 350px;
}

.conversations-list {
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.conversations-header {
    display: flex;
    background: #fff;
    border-bottom: solid 1px #e4e6e9;
    flex-direction: row;
    flex-shrink: 0;
}
.menu-button {
    background:url("../../assets/svg/dots.svg") 50% no-repeat;
    width: 36px;
    height: 36px;
    border:0;
    margin: 10px;
    padding: 0;
    outline: 0;
    opacity: .8;
}
.menu-button:hover,
.menu-button:focus {
    opacity: 1;
}
.menu-button:active {
    transform: translateY(1px);
}
.dialogs-search {
    display: flex;
    flex-grow: 1;
}
.dialogs-search__field {
	flex-grow: 1;
	flex-shrink: 0;
	background-color: #eef1f4;
	border: 0;
	border-radius: 3px;
	font-size: 14px;
	padding: 10px;
	margin: 10px;
	outline: none;
}
.dialogs-search__field::placeholder {
	color: #9ca2ad;
}
</style>
