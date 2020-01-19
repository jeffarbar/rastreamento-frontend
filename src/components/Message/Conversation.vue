<script>
import Message from './Message';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

import data from "@zaichaopan/emoji-picker/data/emojis.json";


export default {
    components: {
        Message
    },
    filters: {
        conversationDate(date) {
            
            var dataMensagem =  String(date).split(" ")

            return dataMensagem[0] + " " +dataMensagem[1]
  
        }
    },
    data () {
        return {
            loading: false,
            conversation: {},
            messages: [],
            message: '',
            data: data
        }
    },
    computed: {
        peer() {
            return this.$store.getters.currentPeer;
        },
        messagesGroupedByDate() {
            return this._groupMessagesByDate(this.messages.reverse());
        } 
    },
    watch: {
        peer (peer_id) {
            this.getHistory(peer_id);
        }
    },
    beforeMount() {
        if (this.peer != 0) {
            this.getHistory(this.peer);
        }
    },
    mounted() {
        this.focusEditor();
        setInterval(
            () => {
                this.getHistory()
            }, 
            1000 * 60 * 3
        );
    },
    
    updated() {
        this.$refs.historyView.scrollTop = this.$refs.historyView.scrollHeight;
    },
    methods: {
        
        getNome(){
            let url = this.$route.fullPath;
            if( url != null && url.indexOf('nome=') > -1 ){
                return url.split('nome=')[1].replace(/%20/g, ' ');
            } 
            return ''
        } ,
        filters(str){ 
            return String(str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2').replace(/&nbsp;/g, ' ');
        },
        updateBody(text) {
            this.message = this.filters(text);
        },
        handleEmojiPicked(emoji) {
            this.$refs.textarea.innerHTML = `${
                this.$refs.textarea.innerHTML
            } ${emoji}`;
            this.updateBody(this.$refs.textarea.innerHTML);
            this.focusEditor();
        },
        handleEditorClick() {
            this.focusEditor();
        },
        focusEditor() {          
            this.$refs.textarea.focus();
        },
        getHistory: function(peer_id) {

            this.loading = true;
            this.messages = [];

            if( peer_id == null || peer_id == undefined ){
               peer_id = this.$store.getters.currentPeer;
            }

            //this.$http.get('http://13.90.142.231:8072/send/mensagem/'+peer_id)
            this.$httpMensagem.get('/mensagem/'+peer_id)
            .then(response => {
                if( response.data != undefined){
                     this.messages = response.data;
                }
                console.log( response.data )
               
                this.loading = false;
            });
        },
        send: function() {
          
            if( this.message != null  && this.message != ''){
                
                var mensagem = {"idMonitoredPont":this.peer,"content": this.message , 'direction':'0'}
                this.$httpMensagem.post('/mensagem/', mensagem
                   // 'http://13.90.142.231:8072/send/mensagem/', mensagem 
                ).then(response => {
                    this.message = '';
                    this.$refs.textarea.innerHTML = '';
                    
                    this.getHistory(this.peer);
                });
            }
        },
        _groupMessagesByDate(messages) {
            return groupBy(messages, function (message) {
                return moment.unix(message.createdAt).startOf('day').format();
            });
        }
    }
}
</script>

<template>
    <div class="dialog-info">
        <div class="conversation-header">
            <div class="conversation__name">{{this.getNome()}}</div>
        </div>

        <div class="im-history" ref="historyView">

            <div v-if="loading" class="spinner"></div>
            <div v-else-if="peer === 0" class="im-placeholder">Por favor selecione um diálogo</div>
            <div v-else-if="messages.length == 0" class="im-placeholder">O histórico de correspondência será exibido aqui.</div>
            
            <div v-for="(messagesAtDay, createdAt) in messagesGroupedByDate" :key="createdAt">
                <template>
                    <!-- <div class="im-history-date">{{createdAt | conversationDate}}</div> -->
                    <div class="im-history-date">{{ messagesAtDay[ messagesAtDay.length - 1 ].createdAt | conversationDate}}</div>
                    
                    <message
                    
                        v-for="message in messagesAtDay"
                        :key="message.id"
                        :message="message"
                        :in-read="conversation.in_read"
                        :out-read="conversation.out_read"
                    />
                </template>
            </div>
        </div>

        <!-- <message-form :peer="peer" v-if="peer !== 0"/> -->
        <!-- <div v-if="peer !== 0" class="im-send-form"> -->
            
            <div class="message">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div contenteditable="true"
                    name="message"
                    class="rich-editor-container im-send-form__textarea"
                    ref="textarea"
                    @keypress.enter.prevent="send"
                    @input="updateBody($event.target.innerHTML)"
                    @click="handleEditorClick"
                    placeholder="Escreva uma mensagem ...">
                </div>
                <div class="message-emoji">
                    <emoji-picker @emoji:picked="handleEmojiPicked" :data="data" />
                </div>
                &nbsp;&nbsp;
                <button class="im-send-form__submit-button" v-on:click="send" ></button>
            </div>
        
    </div>

</template>

<style>
.conversation-header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 5;
    height: 57px;
    background: #fff;
    border-bottom: 1px solid #e4e6e9;
    white-space: nowrap;
    font-size: 10px;
    line-height: 18px;
}
.conversation__name {
    line-height: 6px;
    margin: 5px 2px;
    font-weight: bold
}

.im-history {
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	flex-grow: 1;
}

.im-history-date {
    color: #828282;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
    padding: 3px 15px;
}

.im-placeholder {
	color: #929eb0;
	font-size: 13px;
	display:flex;
	flex-grow:1;
	text-align: center;
	align-items: center;
	justify-content: center;
	padding-top: 100px; /* Image at top */
	background: url("https://vk.com/images/icons/empty_icon.png") no-repeat center;
	user-select: none
}

/** */

.im-send-form {
	padding: 0 0 0 10px;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	border-top: solid 1px #e4e6e9;
	background: #fafbfc;
}

.im-send-form__textarea {
    background: #fafbfc  !important;
	flex-grow: 1;
	font-size: 13px;
	height: 36px;
	min-height: 36px;
	max-height: 200px;
	border-radius: 6px;
    line-height: 17px;
	padding: 9px 74px 10px 13px;
	margin: 7px 0;
	border: solid 1px #d3d9de;
	outline: 0;
}

.im-send-form__submit-button {
    align-self: flex-end;
    background:url('./../../assets/svg/send-logo.png') no-repeat;
	background-size: 35px 35px;
	width: auto;
    height: auto;
	border: none;
	outline: none;
    padding: 20.5px 23px;
    cursor: pointer;
	opacity: 0.7;
	animation: 0.15s linear 0s im-zoom-appear;
}
.im-send-form__submit-button:hover {
	opacity: 1;
}

.svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #4691f6;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}


/** emoji **/


.message {
  position: relative;
  display: flex;
  width: 100%;
  height: 7%;
}

.rich-editor-container {
 width: 100%;
 height: 2rem;
 border: 1px solid #ddd;
 border-radius: 9999px;
 padding: 5px 40px 5px 15px;
 line-height: 2rem;  
}
.message-emoji {
 position: absolute;
 right: 60px;
 top: 14px;
}
[contenteditable="true"]:empty:before {
 content: attr(placeholder);
 color: grey;
}


</style>
