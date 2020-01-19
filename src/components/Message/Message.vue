<script>
import moment from 'moment';

export default {
    props: ['message', 'in-read', 'out-read'],
    computed: {
        peer: function() {
            return this.$store.getters.peerById(this.message.from_id);
        }
    },
    filters: {
        nl2br: function(str, isXhtml) {
            return String(str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
        }
    },
    methods: {
    
        lida: function(idMensagem) {
            this.message.lida = true
            console.log(idMensagem) 

            this.$httpMensagem.get('/mensagem/ler/'+idMensagem).then(response => {
                //'http://13.90.142.231:8072/send/mensagem/ler/'+idMensagem).then(response => {
            });
        }
    }
}
</script>

<template>
    <!-- recebido -->
    <div v-if="message.direction == 1" class="im-history__message__recebe" v-bind:class="{'im-history__message_unread': message.lida}">

        <img src="./../../assets/svg/profile.png" class="im-history__message__photo__recebe"> 

        <div class="im-history__message__body__recebe">
            <!--<a href="#" @click="lida(message.id)" > -->
                <div class="im-history__message__meta__recebe">
                    <template>{{message.idMonitoredPont}} </template>
                    <span class="im-history__message__time__recebe">{{ message.createdAt  }}</span>
                    <br><span v-if="message.transport" class="im-history__message__time__recebe">{{message.transport}}</span>
                </div>
                <div  class="im-history__message__text__recebe" v-html="$options.filters.nl2br($options.filters.linkify(message.content))"></div>
            <!--</a> -->   
            <div class="im-history__message__text__marca">
                <img v-if="message.lida" src="./../../assets/svg/lida.png">
                <img v-else-if="message.recebida" src="./../../assets/svg/recebida.png">

            </div>
        </div>
       
    </div>
    <!-- envia -->
    <div v-else class="im-history__message__envia" v-bind:class="{'im-history__message_unread': message.lida}">

        <div class="im-history__message__body__envia">
           <!-- <a href="#"> -->
                <div class="im-history__message__meta__envia">
                    <template>{{message.idMonitoredPont}} </template>
                    <span class="im-history__message__time__envia">{{  message.createdAt }}</span>
                    <br><span v-if="message.transport" class="im-history__message__time__envia">{{  message.transport }}</span>
                </div>
                <div  class="im-history__message__text__envia" v-html="$options.filters.nl2br($options.filters.linkify(message.content))"></div>
           <!-- </a> -->   
            <div class="im-history__message__text__marca">
                <img v-if="message.lida" src="./../../assets/svg/lida.png">
                <img v-else-if="message.recebida" src="./../../assets/svg/recebida.png">
            </div>
        </div>
        <img src="./../../assets/svg/profile.png" class="im-history__message__photo__envia"> 
       
    </div>
</template>

<style>
.im-history__day {
    color: #828282;
    text-align: center;
    font-size: 12.5px;
    background: #fff;
    font-weight: 400;
    position: relative;
    margin: 10px 43px;
    border: none;
    padding: 0;
}

.im-history__message__recebe {
    display: flex;
    flex-shrink: 0;
    font-size: 13px;
    border-radius: 3px;
    margin: 0 10px;
    overflow: hidden;
    padding: 5px 20px;
    text-align: right;
}

.im-history__message__envia {
    display: flex;
    flex-shrink: 0;
    font-size: 13px;
    border-radius: 3px;
    margin: 0 10px;
    overflow: hidden;
    padding: 5px 20px;
    text-align: left;
    background: #ADD8E6 ;
}


.im-history__message_unread {
    background: #edf0f5;
}


.im-history__message__body__envia {
    overflow: hidden;
    margin: 0 10px;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: right;
}
.im-history__message__body__recebe {
    overflow: hidden;
    margin: 0 10px;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
}
.im-history__message__photo__recebe {
    background-color: #fafbfc;
    flex-shrink: 0;
    height: 15px;
    width: 60px;
    margin: 5px;
    margin-left: 5px;
}

.im-history__message__photo__envia {
    background-color: #ADD8E6;
    flex-shrink: 0;
    height: 15px;
    width: 60px;
    margin: 5px;
    margin-left: 5px;
}

.im-history__message__meta__recebe {
    font-size: 12px;
    margin-top: 10px;
    text-align: left;
}
.im-history__message__meta__envia {
    font-size: 12px;
    margin-top: 10px;
    text-align: right;
}
.im-history__message__text__recebe {
    margin-top: 5px;
    word-wrap: break-word;
    text-align: left;
}
.im-history__message__text__envia {
    margin-top: 5px;
    word-wrap: break-word;
    text-align: right;
}
.im-history__message__text__marca {
    margin-top: 5px;
    text-align: right
}
.im-history__message__username {
    max-width: 200px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}
.im-history__message__time__recebe {
    font-weight: 400;
    color: rgba(120, 127, 140, 0.6);
    text-align: left;
}
.im-history__message__time__envia {
    font-weight: 400_;
    color: rgba(120, 127, 140, 0.6);
    text-align: right;
}



</style>
