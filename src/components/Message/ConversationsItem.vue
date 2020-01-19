<script>

import moment from 'moment';
import { log } from 'util';

let DIALOG_COLORS = [
    "#FA6664", "#E63F3C",
    "#FFC247", "#FFA21F",
    "#FFE500", "#EBCB00",
    "#6BD670", "#49B84F"
];

export default {
    props: ['dialog'],
    methods: {
        select: function() {
          
            if( this.dialog.identificador != this.$store.getters.currentPeer ){
                //  console.log('ffff' + this.dialog.identificador)
                this.$router.push('?peer=' + this.dialog.identificador+'&nome='+this.dialog.nome);
            }
        },
        getColor() {
            return DIALOG_COLORS[this.dialog.identificador % 8];
        },
        formatarData: (data) => {
            return moment(data,'DD/MM/YYYY HH:mm:ss').format("DD MMM HH:mm");
        }
    },
    computed: {
        selected: function() {
            console.log( this.dialog.identificador + " ff " + this.$store.getters.currentPeer )
            return (this.dialog.identificador == this.$store.getters.currentPeer);
        },
        unread () {
            /*
            return (
                this.dialog.conversation.last_message_id != this.dialog.conversation.in_read
                ||
                this.dialog.conversation.last_message_id != this.dialog.conversation.out_read
            )
            */
        },
        hasChat() {
            //return this.dialog.conversation.peer.type == 'chat';
        }
    },
    filters: {
        dialogTimeFormat: (timestamp) => {
            var time = moment.unix(timestamp);

            // Today
            if(time.isSame(moment(), 'day')) {
                return time.format('H:mm');
            // Yesterday
            } else if( time.isSame(moment().subtract(1, 'day'), 'day') ) {
                return time.format(' ');
            // Current year
            } else if (time.isSame(moment(), 'year')) {
                return time.format('D MMM');
            // All other
            } else {
                return time.format('D MMM YYYY');
            }
        }
    }
}
</script>

<template>
    <div class="dialog" :class="{dialog_selected: selected}" @click="select">
        <!-- <div class="user-container" :class="{online: dialog.online}"> -->
        <div class="user-container" :class="{online: false}">
            <div class="dialog__photo user-photo" :style="{backgroundColor:  getColor()}">
                <img src="./../../assets/svg/profile.png" alt="">
            </div>
        </div>
 
        <div class="dialog__content">
            <div class="dialog__name">
        
                <template v-if="dialog.nome">{{dialog.nome}}</template>
            </div>
            <span class="dialog__time">{{ this.formatarData( dialog.dtCadastro ) }}</span>
            <!-- <div class="dialog__remove-button" title="Excluir caixa de diálogo">×</div> -->
            
            <div class="dialog__message">
                <!-- <span v-if="dialog.last_message.out" class="dialog__who">Você é:</span> -->
                <!--  <span v-else-if="dialog.conversation.peer.type == 'chat'" class="dialog__who">{{peer.first_name}}:</span> -->
                <span  class="dialog__who">Olá </span>
                <span class="dialog__message-body">
                    {{dialog.tipoPontoMonitorado}}
                    <!--
                    <div v-if="dialog.content && dialog.content.length > 8" >{{dialog.content.substring(0, 7)}}...</div>
                    <div v-else-if="dialog.content" >{{dialog.content}}...</div>
                    <div v-else>...</div>
                    -->
                    <!--
                    <div v-if="!dialog.lida">
                        <strong>
                            <div v-if="dialog.content && dialog.content.length > 8" >{{dialog.content.substring(0, 7)}}...</div>
                            <div v-else-if="dialog.content" >{{dialog.content}}...</div>
                            <div v-else>...</div>
                        </strong>
                    </div>
                    <div v-else>
                        <div v-if="dialog.content && dialog.content.length > 8" >{{dialog.content.substring(0, 7)}}...</div>
                        <div v-else-if="dialog.content" >{{dialog.content}}...</div>
                        <div v-else>...</div>
                    </div>
                    -->
                    <!--
                    <span v-if="dialog.last_message.attachments.length"><strong>[Anexo]</strong></span>
                    <span v-if="dialog.last_message.fwd_messages.length"><strong>[Mensagem]</strong></span>
                    -->
                </span>
                <!-- <div class="dialog__unread-indicator" v-if="!dialog.lida"></div> -->
                <div class="dialog__unread-indicator" v-if="false"></div>
            </div>
        </div>
    </div>
</template>


<style>
.dialog {
	display: flex;
    flex-direction: row;
    align-items: center;
	border-bottom: solid 1px #e4e6e9;
	cursor: pointer;
	position: relative;
	padding: 0 15px;
	overflow: hidden;
}
.dialog:not(.dialog_selected):hover {
	background: #f5f7fa;
}

.dialog_selected {
	background: #5b88bd;
}


.dialog__photo {
	align-self: center;
	height: 46px;
    width: 46px;
    line-height: 46px;
    text-align: center;
	margin: 5px;
	flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
    font-size: 25px;
    color: #fff;
    text-transform: uppercase;
}
.dialog__content {
	flex-grow: 1;
	padding: 8px 0;
	margin-left: 5px;
	min-width: 0; /* Overflow:hidden fix for flex */
}
.dialog__name {
	color: #222;
	display: inline-block;
	font-size: 12.5px;
	font-weight: 500;
	margin-top: 10px;
	max-width: 70%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.dialog__time {
	font-size: 12px;
	color:#777e8c;
	float: right;
	margin-top: 10px;
	opacity: 0.7;
}
.dialog:hover .dialog__time {
	display: none;
}
.dialog__remove-button {
	color:#777e8c;
	opacity: 0;
	position: absolute;
	right: 5px;
	cursor: pointer;
	display: inline-block;
	padding: 5px 10px;
	font-size: 16px;
	font-weight: bold;
}
.dialog:hover .dialog__remove-button {
	opacity: 0.4;
}
.dialog .dialog__remove-button:hover {
	opacity: 1;
}
.dialog__who {
    color: #8b939b;
    margin-right: 3px;
}


.dialog__message {
    display: flex;
    align-items: center;
	color: #656565;
	font-size: 12.5px;
	max-width: 100%;
	overflow: hidden;
	padding: 5px 0;
	text-overflow: ellipsis;
	white-space: nowrap;
    line-height: 16px;
}
.dialog_selected .dialog__name,
.dialog_selected .dialog__message,
.dialog_selected .dialog__time,
.dialog_selected .dialog__who,
.dialog_selected .dialog__remove-button {
	color: #fff;
}
.dialog_selected .online:after {
    border-color: #5b88bd;
}
.dialog:not(.dialog_selected):hover .online:after {
    border-color: #f5f7fa;
}
.dialog__message-body {
    flex-grow:1;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dialog__unread-indicator {
    flex-shrink: 0;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin-left: 5px;
    background: #93adc8e6;
}
.dialog_selected .dialog__unread-indicator {
    background: #fff;
    color: #5b88bd;
}
</style>
