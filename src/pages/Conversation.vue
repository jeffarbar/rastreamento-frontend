<script>
import Conversations from '@/components/Message/Conversations';
import Conversation from '@/components/Message/Conversation';

export default {
    components: {
        Conversations,
        Conversation
    }
}
</script>

<template>
    <div class="context_" >
        <div class="im-container">
            <conversations></conversations>
            <conversation></conversation>
        </div>
       
    </div>
</template>

<style>

.context_{
    flex-grow: 1;
}

.copyright{
    text-align: center;
    font-size: 12px;
}

.im-container {
    position: relative;
    display: flex;
    flex-grow: 1;
    /**background-color: antiquewhite; **/
	border-radius: 1px;
	box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
    height: 84vh;
    width: 155vh;
	margin: 0px auto;
	overflow: hidden;
	
}

.im-container::before {
    content: "";
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.1;
}

.conversations-page,
.dialog-info {
    position: relative;
    z-index: 3;
}

@media only screen and (max-width: 768px) {
    .conversations-page {
        width: 100% !important;
    }
    .dialog-info {
        display: none;
    }
    .im-container {
        margin: 0;
        height: 100vh;
    }
}
</style>
