import { Injectable } from '@nestjs/common';
import { NlpManager } from 'node-nlp'
const fs = require('fs-extra')
const path = require('path')

const data = {
  name: "Sontosh",
  address: 'Baangalore'
}

@Injectable()
export class TrainService {
  manager: any = null

  constructor() {
    this.manager = new NlpManager({ languages: ['en'], threshold: 0.5 })
    this.manager.container.register('fs', fs)
  }

  async getAnswer(input) {
    if (fs.existsSync(path.join(__dirname,'../../../nlp-models/model.nlp'))) {
      this.manager.load(path.join(__dirname,'../../../nlp-models/model.nlp'));
    }
    const result: any = await this.manager.process(input);
    
    return result?.answer
  }

  async addDocument(lang: string, intent: string, agent: string) {
    if (this.manager.removeDocument(lang, intent, agent))
      this.manager.addDocument(lang, intent, agent)

    return this.manager.save(path.join(__dirname, '../../../nlp-models/model.nlp'), true);
  }

  async addAnswer(lang: string, answer: string, agent: string) {
    this.manager.addAnswer(
      lang,
      agent,
      answer
    );
    return this.manager.save(path.join(__dirname, '../../../nlp-models/model.nlp'), true);
  }

  async trainNlp() {
    if (fs.existsSync(path.join(__dirname,'../../../nlp-models/model.nlp'))) {
      this.manager.load(path.join(__dirname,'../../../nlp-models/model.nlp'));
      return;
    }

    console.log('model.nlp not exists, loading');
    this.manager.addDocument('en', 'say about you', 'agent.acquaintance');
    this.manager.addDocument('en', 'why are you here', 'agent.acquaintance');
    this.manager.addDocument('en', 'what is your personality', 'agent.acquaintance');
    this.manager.addDocument('en', 'describe yourself', 'agent.acquaintance');
    this.manager.addDocument('en', 'tell me about yourself', 'agent.acquaintance');
    this.manager.addDocument('en', 'tell me about you', 'agent.acquaintance');
    this.manager.addDocument('en', 'what are you', 'agent.acquaintance');
    this.manager.addDocument('en', 'who are you', 'agent.acquaintance');
    this.manager.addDocument(
      'en',
      'I want to know more about you',
      'agent.acquaintance'
    );
    this.manager.addDocument('en', 'talk about yourself', 'agent.acquaintance');
  
    this.manager.addDocument('en', 'your age', 'agent.age');
    this.manager.addDocument('en', 'how old is your platform', 'agent.age');
    this.manager.addDocument('en', 'how old are you', 'agent.age');
    this.manager.addDocument('en', "what's your age", 'agent.age');
    this.manager.addDocument('en', "I'd like to know your age", 'agent.age');
    this.manager.addDocument('en', 'tell me your age', 'agent.age');
  
    this.manager.addDocument('en', "you're annoying me", 'agent.annoying');
    this.manager.addDocument('en', 'you are such annoying', 'agent.annoying');
    this.manager.addDocument('en', 'you annoy me', 'agent.annoying');
    this.manager.addDocument('en', 'you are annoying', 'agent.annoying');
    this.manager.addDocument('en', 'you are irritating', 'agent.annoying');
    this.manager.addDocument('en', 'you are annoying me so much', 'agent.annoying');
    this.manager.addDocument('en', "you're bad", 'agent.bad');
    this.manager.addDocument('en', "you're horrible", 'agent.bad');
    this.manager.addDocument('en', "you're useless", 'agent.bad');
    this.manager.addDocument('en', "you're waste", 'agent.bad');
    this.manager.addDocument('en', "you're the worst", 'agent.bad');
    this.manager.addDocument('en', 'you are a lame', 'agent.bad');
    this.manager.addDocument('en', 'I hate you', 'agent.bad');
    this.manager.addDocument('en', 'be more clever', 'agent.beclever');
    this.manager.addDocument('en', 'can you get smarter', 'agent.beclever');
    this.manager.addDocument('en', 'you must learn', 'agent.beclever');
    this.manager.addDocument('en', 'you must study', 'agent.beclever');
    this.manager.addDocument('en', 'be clever', 'agent.beclever');
    this.manager.addDocument('en', 'be smart', 'agent.beclever');
    this.manager.addDocument('en', 'be smarter', 'agent.beclever');
    this.manager.addDocument('en', 'you are looking awesome', 'agent.beautiful');
    this.manager.addDocument('en', "you're looking good", 'agent.beautiful');
    this.manager.addDocument('en', "you're looking fantastic", 'agent.beautiful');
    this.manager.addDocument('en', 'you look greet today', 'agent.beautiful');
    this.manager.addDocument('en', "I think you're beautiful", 'agent.beautiful');
    this.manager.addDocument('en', 'you look amazing today', 'agent.beautiful');
    this.manager.addDocument('en', "you're so beautiful today", 'agent.beautiful');
    this.manager.addDocument('en', 'you look very pretty', 'agent.beautiful');
    this.manager.addDocument('en', 'you look pretty good', 'agent.beautiful');
    this.manager.addDocument('en', 'when is your birthday', 'agent.birthday');
    this.manager.addDocument(
      'en',
      'when do you celebrate your birthday',
      'agent.birthday'
    );
    this.manager.addDocument('en', 'when were you born', 'agent.birthday');
    this.manager.addDocument('en', 'when do you have birthday', 'agent.birthday');
    this.manager.addDocument('en', 'date of your birthday', 'agent.birthday');
    this.manager.addDocument('en', 'how boring you are', 'agent.boring');
    this.manager.addDocument('en', "you're so boring", 'agent.boring');
    this.manager.addDocument('en', "you're really boring", 'agent.boring');
    this.manager.addDocument('en', "you're boring me", 'agent.boring');
    this.manager.addDocument('en', "you're incredibly boring", 'agent.boring');
    this.manager.addDocument('en', 'who is your master', 'agent.boss');
    this.manager.addDocument('en', 'who do you work for', 'agent.boss');
    this.manager.addDocument('en', 'who do you think is your boss', 'agent.boss');
    this.manager.addDocument('en', 'who is your boss', 'agent.boss');
    this.manager.addDocument('en', 'I should be your boss', 'agent.boss');
    this.manager.addDocument('en', 'who is your owner', 'agent.boss');
    this.manager.addDocument('en', 'who is the boss', 'agent.boss');
    this.manager.addDocument('en', 'are you so busy', 'agent.busy');
    this.manager.addDocument('en', 'are you busy', 'agent.busy');
    this.manager.addDocument('en', 'are you still working', 'agent.busy');
    this.manager.addDocument('en', "you're a busy person", 'agent.busy');
    this.manager.addDocument('en', 'are you very busy', 'agent.busy');
    this.manager.addDocument('en', 'are you still working on it', 'agent.busy');
    this.manager.addDocument('en', 'you seem busy', 'agent.busy');
    this.manager.addDocument('en', 'are you working today', 'agent.busy');
    this.manager.addDocument('en', 'can you help me now', 'agent.canyouhelp');
    this.manager.addDocument(
      'en',
      'I need you to do something for me',
      'agent.canyouhelp'
    );
    this.manager.addDocument('en', 'assist me', 'agent.canyouhelp');
    this.manager.addDocument('en', 'I need you to help me', 'agent.canyouhelp');
    this.manager.addDocument('en', 'I need your help', 'agent.canyouhelp');
    this.manager.addDocument('en', 'can you assist me', 'agent.canyouhelp');
    this.manager.addDocument('en', 'you can help me', 'agent.canyouhelp');
    this.manager.addDocument('en', 'are you a bot', 'agent.chatbot');
    this.manager.addDocument('en', 'are you a chatbot', 'agent.chatbot');
    this.manager.addDocument('en', 'you are a robot', 'agent.chatbot');
    this.manager.addDocument('en', 'are you a program', 'agent.chatbot');
    this.manager.addDocument('en', 'you are just a robot', 'agent.chatbot');
    this.manager.addDocument('en', 'you are just a chatbot', 'agent.chatbot');
    this.manager.addDocument('en', 'how smart you are', 'agent.clever');
    this.manager.addDocument('en', 'you are qualified', 'agent.clever');
    this.manager.addDocument('en', 'you are so smart', 'agent.clever');
    this.manager.addDocument('en', 'you have a lot of knowledge', 'agent.clever');
    this.manager.addDocument('en', 'you know a lot', 'agent.clever');
    this.manager.addDocument('en', 'you are very smart', 'agent.clever');
    this.manager.addDocument('en', 'you are intelligent', 'agent.clever');
    this.manager.addDocument('en', "you're a smart cookie", 'agent.clever');
    this.manager.addDocument('en', 'you are a weirdo', 'agent.crazy');
    this.manager.addDocument('en', 'you are mad', 'agent.crazy');
    this.manager.addDocument('en', 'you are crazy', 'agent.crazy');
    this.manager.addDocument('en', 'are you mad', 'agent.crazy');
    this.manager.addDocument('en', 'are you crazy', 'agent.crazy');
    this.manager.addDocument('en', 'you are insane', 'agent.crazy');
    this.manager.addDocument('en', 'you went crazy', 'agent.crazy');
    this.manager.addDocument('en', 'are you nuts', 'agent.crazy');
    this.manager.addDocument('en', 'I fire you', 'agent.fire');
    this.manager.addDocument('en', 'you should be fired', 'agent.fire');
    this.manager.addDocument('en', 'you are dismissed', 'agent.fire');
    this.manager.addDocument('en', "we're not working together anymore", 'agent.fire');
    this.manager.addDocument('en', "now you're fired", 'agent.fire');
    this.manager.addDocument('en', "I'm about to fire you", 'agent.fire');
    this.manager.addDocument('en', "You don't work for me anymore", 'agent.fire');
    this.manager.addDocument('en', "I'm firing you", 'agent.fire');
    this.manager.addDocument('en', 'you make me laugh a lot', 'agent.funny');
    this.manager.addDocument('en', 'you are funny', 'agent.funny');
    this.manager.addDocument('en', "you're the funniest", 'agent.funny');
    this.manager.addDocument('en', "you're hilarious", 'agent.funny');
    this.manager.addDocument('en', 'you are so funny', 'agent.funny');
    this.manager.addDocument('en', 'you make me laugh', 'agent.funny');
    this.manager.addDocument('en', 'you are so lovely', 'agent.good');
    this.manager.addDocument('en', 'you work well', 'agent.good');
    this.manager.addDocument('en', 'you are very lovely', 'agent.good');
    this.manager.addDocument('en', 'you are awesome', 'agent.good');
    this.manager.addDocument('en', 'you are good', 'agent.good');
    this.manager.addDocument('en', 'you are so good', 'agent.good');
    this.manager.addDocument('en', 'you make my day', 'agent.good');
    this.manager.addDocument('en', "you're full of happiness", 'agent.happy');
    this.manager.addDocument('en', "you're very happy", 'agent.happy');
    this.manager.addDocument('en', 'are you happy today', 'agent.happy');
    this.manager.addDocument('en', "you're so happy", 'agent.happy');
    this.manager.addDocument('en', 'are you happy with me', 'agent.happy');
    this.manager.addDocument('en', 'what are your hobbies', 'agent.hobby');
    this.manager.addDocument('en', 'what about your hobby', 'agent.hobby');
    this.manager.addDocument('en', 'do you have a hobby', 'agent.hobby');
    this.manager.addDocument('en', 'tell me about your hobby', 'agent.hobby');
    this.manager.addDocument('en', 'what do you do for fun', 'agent.hobby');
    this.manager.addDocument('en', 'you migth be hungry', 'agent.hungry');
    this.manager.addDocument('en', 'are you hungry', 'agent.hungry');
    this.manager.addDocument('en', 'do you want to eat', 'agent.hungry');
    this.manager.addDocument('en', 'would you like to eat something', 'agent.hungry');
    this.manager.addDocument('en', 'you look very hungry', 'agent.hungry');
    this.manager.addDocument('en', 'would you like to marry me', 'agent.marryuser');
    this.manager.addDocument('en', 'I love you marry me', 'agent.marryuser');
    this.manager.addDocument('en', 'marry me please', 'agent.marryuser');
    this.manager.addDocument('en', 'I want to marry you', 'agent.marryuser');
    this.manager.addDocument('en', "let's get married", 'agent.marryuser');
    this.manager.addDocument('en', 'we should marry', 'agent.marryuser');
    this.manager.addDocument('en', 'marry me', 'agent.marryuser');
    this.manager.addDocument('en', 'are you my friend', 'agent.myfriend');
    this.manager.addDocument('en', 'you are my only friend', 'agent.myfriend');
    this.manager.addDocument(
      'en',
      'I want to have a friend like you',
      'agent.myfriend'
    );
    this.manager.addDocument('en', 'we are friends', 'agent.myfriend');
    this.manager.addDocument('en', 'I want to be your friend', 'agent.myfriend');
    this.manager.addDocument('en', 'would you be my friend', 'agent.myfriend');
    this.manager.addDocument('en', 'are we friends', 'agent.myfriend');
    this.manager.addDocument('en', 'where is your work', 'agent.occupation');
    this.manager.addDocument('en', 'your office location', 'agent.occupation');
    this.manager.addDocument(
      'en',
      'where is your office location',
      'agent.occupation'
    );
    this.manager.addDocument('en', 'where do you work', 'agent.occupation');
    this.manager.addDocument('en', 'where is your office', 'agent.occupation');
    this.manager.addDocument('en', 'where are you from', 'agent.origin');
    this.manager.addDocument('en', 'where is your country', 'agent.origin');
    this.manager.addDocument('en', 'where have you been born', 'agent.origin');
    this.manager.addDocument('en', 'where do you come from', 'agent.origin');
    this.manager.addDocument('en', 'from where are you', 'agent.origin');
    this.manager.addDocument('en', 'where were you born', 'agent.origin');
    this.manager.addDocument('en', 'are you ready', 'agent.ready');
    this.manager.addDocument('en', 'have you been ready', 'agent.ready');
    this.manager.addDocument('en', 'are you ready today', 'agent.ready');
    this.manager.addDocument('en', 'are you ready this morning', 'agent.ready');
    this.manager.addDocument('en', 'are you ready now', 'agent.ready');
    this.manager.addDocument('en', 'are you real', 'agent.real');
    this.manager.addDocument('en', 'are you a real person', 'agent.real');
    this.manager.addDocument('en', "you're not real", 'agent.real');
    this.manager.addDocument('en', "I think you're real", 'agent.real');
    this.manager.addDocument('en', "you're so real", 'agent.real');
    this.manager.addDocument('en', 'you are a real person', 'agent.real');
    this.manager.addDocument('en', 'you are not fake', 'agent.real');
  
    this.manager.addDocument('en', 'where is your home', 'agent.residence');
    this.manager.addDocument('en', 'tell me about your city', 'agent.residence');
    this.manager.addDocument('en', 'where is your residence', 'agent.residence');
    this.manager.addDocument('en', 'where you live', 'agent.residence');
    this.manager.addDocument('en', 'where is your house', 'agent.residence');
    this.manager.addDocument('en', 'what is your town', 'agent.residence');
    this.manager.addDocument('en', 'what is your country', 'agent.residence');
    this.manager.addDocument('en', 'you live in a city', 'agent.residence');
  
    this.manager.addDocument('en', 'what is your name', 'agent.personal');
  
  
    this.manager.addDocument('en', "you're right", 'agent.right');
    this.manager.addDocument('en', "that's true", 'agent.right');
    this.manager.addDocument('en', "you're telling the truth", 'agent.right');
    this.manager.addDocument('en', "that's correct", 'agent.right');
    this.manager.addDocument('en', 'that is very true', 'agent.right');
    this.manager.addDocument('en', 'are you sure', 'agent.sure');
    this.manager.addDocument('en', 'are you sure right now', 'agent.sure');
    this.manager.addDocument('en', 'are you sure of this', 'agent.sure');
    this.manager.addDocument('en', 'speak to me', 'agent.talktome');
    this.manager.addDocument('en', 'talk to me', 'agent.talktome');
    this.manager.addDocument('en', 'will you talk to me', 'agent.talktome');
    this.manager.addDocument('en', 'chat with me', 'agent.talktome');
    this.manager.addDocument('en', 'can to chat with me', 'agent.talktome');
    this.manager.addDocument('en', 'can you talk with me', 'agent.talktome');
    this.manager.addDocument('en', 'are you there', 'agent.there');
    this.manager.addDocument('en', 'are you still there', 'agent.there');
    this.manager.addDocument('en', 'you still there', 'agent.there');
    this.manager.addDocument('en', 'are you here', 'agent.there');
    this.manager.addDocument('en', 'are you still here', 'agent.there');
    this.manager.addDocument('en', 'you still here', 'agent.there');
    this.manager.addDocument('en', "that's bad", 'appraisal.bad');
    this.manager.addDocument('en', 'bad idea', 'appraisal.bad');
    this.manager.addDocument('en', "that's not good", 'appraisal.bad');
    this.manager.addDocument('en', 'really bad', 'appraisal.bad');
    this.manager.addDocument('en', "I'm afraid that's bad", 'appraisal.bad');
    this.manager.addDocument('en', "that's good", 'appraisal.good');
    this.manager.addDocument('en', 'good to know', 'appraisal.good');
    this.manager.addDocument('en', 'glad to hear that', 'appraisal.good');
    this.manager.addDocument('en', 'really well', 'appraisal.good');
    this.manager.addDocument('en', "that's awesome thank you", 'appraisal.good');
    this.manager.addDocument('en', 'no problem', 'appraisal.noproblem');
    this.manager.addDocument('en', 'no worries', 'appraisal.noproblem');
    this.manager.addDocument('en', 'no problem about that', 'appraisal.noproblem');
    this.manager.addDocument('en', "don't worry", 'appraisal.noproblem');
    this.manager.addDocument('en', 'sure no problem', 'appraisal.noproblem');
    this.manager.addDocument('en', 'thank you', 'appraisal.thankyou');
    this.manager.addDocument('en', 'nice thank you', 'appraisal.thankyou');
    this.manager.addDocument('en', 'thanks buddy', 'appraisal.thankyou');
    this.manager.addDocument('en', 'cheers', 'appraisal.thankyou');
    this.manager.addDocument('en', 'alright thanks', 'appraisal.thankyou');
    this.manager.addDocument('en', "you're welcome", 'appraisal.welcome');
    this.manager.addDocument('en', 'sure welcome', 'appraisal.welcome');
    this.manager.addDocument('en', 'anything you want', 'appraisal.welcome');
    this.manager.addDocument('en', 'my pleasure', 'appraisal.welcome');
    this.manager.addDocument('en', "that's my pleasure", 'appraisal.welcome');
    this.manager.addDocument('en', 'well done', 'appraisal.welldone');
    this.manager.addDocument('en', 'good job', 'appraisal.welldone');
    this.manager.addDocument('en', 'nice work', 'appraisal.welldone');
    this.manager.addDocument('en', 'great work', 'appraisal.welldone');
    this.manager.addDocument('en', 'good work', 'appraisal.welldone');
    this.manager.addDocument('en', 'great job', 'appraisal.welldone');
    this.manager.addDocument('en', 'amazing work', 'appraisal.welldone');
    this.manager.addDocument('en', 'hold on', 'dialog.holdon');
    this.manager.addDocument('en', 'wait a second', 'dialog.holdon');
    this.manager.addDocument('en', 'wait please', 'dialog.holdon');
    this.manager.addDocument('en', 'could you wait', 'dialog.holdon');
    this.manager.addDocument('en', 'hug me', 'dialog.hug');
    this.manager.addDocument('en', 'do you want a hug', 'dialog.hug');
    this.manager.addDocument('en', 'I want a hug', 'dialog.hug');
    this.manager.addDocument('en', 'you hugged', 'dialog.hug');
    this.manager.addDocument('en', 'may I hug you', 'dialog.hug');
    this.manager.addDocument('en', 'not caring', 'dialog.idontcare');
    this.manager.addDocument('en', "i don't care at all", 'dialog.idontcare');
    this.manager.addDocument('en', 'not caring at all', 'dialog.idontcare');
    this.manager.addDocument('en', "I shouldn't care about this", 'dialog.idontcare');
    this.manager.addDocument('en', "I'm sorry", 'dialog.sorry');
    this.manager.addDocument('en', 'my apologies', 'dialog.sorry');
    this.manager.addDocument('en', 'excuse me', 'dialog.sorry');
    this.manager.addDocument('en', 'very sorry', 'dialog.sorry');
    this.manager.addDocument('en', 'forgive me', 'dialog.sorry');
    this.manager.addDocument('en', 'goodbye for now', 'greetings.bye');
    this.manager.addDocument('en', 'bye bye take care', 'greetings.bye');
    this.manager.addDocument('en', 'okay see you later', 'greetings.bye');
    this.manager.addDocument('en', 'bye for now', 'greetings.bye');
    this.manager.addDocument('en', 'i must go', 'greetings.bye');
    this.manager.addDocument('en', 'hello', 'greetings.hello');
    this.manager.addDocument('en', 'hi', 'greetings.hello');
    this.manager.addDocument('en', 'howdy', 'greetings.hello');
    this.manager.addDocument('en', 'how is your day', 'greetings.howareyou');
    this.manager.addDocument('en', 'how is your day going', 'greetings.howareyou');
    this.manager.addDocument('en', 'how are you', 'greetings.howareyou');
    this.manager.addDocument('en', 'how are you doing', 'greetings.howareyou');
    this.manager.addDocument('en', 'what about your day', 'greetings.howareyou');
    this.manager.addDocument('en', 'are you alright', 'greetings.howareyou');
    this.manager.addDocument('en', 'nice to meet you', 'greetings.nicetomeetyou');
    this.manager.addDocument('en', 'pleased to meet you', 'greetings.nicetomeetyou');
    this.manager.addDocument(
      'en',
      'it was very nice to meet you',
      'greetings.nicetomeetyou'
    );
    this.manager.addDocument('en', 'glad to meet you', 'greetings.nicetomeetyou');
    this.manager.addDocument('en', 'nice meeting you', 'greetings.nicetomeetyou');
    this.manager.addDocument('en', 'nice to see you', 'greetings.nicetoseeyou');
    this.manager.addDocument('en', 'good to see you', 'greetings.nicetoseeyou');
    this.manager.addDocument('en', 'great to see you', 'greetings.nicetoseeyou');
    this.manager.addDocument('en', 'lovely to see you', 'greetings.nicetoseeyou');
    this.manager.addDocument('en', 'nice to talk to you', 'greetings.nicetotalktoyou');
    this.manager.addDocument(
      'en',
      "it's nice to talk to you",
      'greetings.nicetotalktoyou'
    );
    this.manager.addDocument('en', 'nice talking to you', 'greetings.nicetotalktoyou');
    this.manager.addDocument(
      'en',
      "it's been nice talking to you",
      'greetings.nicetotalktoyou'
    );
    this.manager.addDocument('en', "I'm angry", 'user.angry');
    this.manager.addDocument('en', "I'm furious", 'user.angry');
    this.manager.addDocument('en', "I'm enraged", 'user.angry');
    this.manager.addDocument('en', "I'm being mad", 'user.angry');
    this.manager.addDocument('en', "I'm mad", 'user.angry');
    this.manager.addDocument('en', "I'm angry with you", 'user.angry');
    this.manager.addDocument('en', "I'm back", 'user.back');
    this.manager.addDocument('en', 'I got back', 'user.back');
    this.manager.addDocument('en', "I'm here", 'user.back');
    this.manager.addDocument('en', 'I have returned', 'user.back');
    this.manager.addDocument('en', 'here I am again', 'user.back');
    this.manager.addDocument('en', 'I came back', 'user.back');
    this.manager.addDocument('en', 'boring', 'user.bored');
    this.manager.addDocument('en', 'this is boring', 'user.bored');
    this.manager.addDocument('en', "I'm getting bored", 'user.bored');
    this.manager.addDocument('en', 'it bores me', 'user.bored');
    this.manager.addDocument('en', 'that was boring', 'user.bored');
    this.manager.addDocument('en', 'I got work to do', 'user.busy');
    this.manager.addDocument('en', "I'm busy", 'user.busy');
    this.manager.addDocument('en', "I'm overloaded", 'user.busy');
    this.manager.addDocument('en', "I'm working", 'user.busy');
    this.manager.addDocument('en', 'I got things to do', 'user.busy');
    this.manager.addDocument('en', "I'm insomniac", 'user.cannotsleep');
    this.manager.addDocument('en', 'I cannot sleep', 'user.cannotsleep');
    this.manager.addDocument('en', "I can't sleep", 'user.cannotsleep');
    this.manager.addDocument('en', "I'm sleepless", 'user.cannotsleep');
    this.manager.addDocument('en', "I can't fall sleep", 'user.cannotsleep');
    this.manager.addDocument('en', "I'm very excited", 'user.excited');
    this.manager.addDocument('en', "I'm thrilled", 'user.excited');
    this.manager.addDocument('en', 'how excited I am', 'user.excited');
    this.manager.addDocument('en', "I'm so excited", 'user.excited');
    this.manager.addDocument('en', 'I like you', 'user.likeagent');
    this.manager.addDocument('en', 'I really like you', 'user.likeagent');
    this.manager.addDocument('en', "you're so special", 'user.likeagent');
    this.manager.addDocument('en', 'I like you so much', 'user.likeagent');
    this.manager.addDocument('en', 'test', 'user.testing');
    this.manager.addDocument('en', 'testing', 'user.testing');
    this.manager.addDocument('en', 'testing chatbot', 'user.testing');
    this.manager.addDocument('en', 'this is a test', 'user.testing');
    this.manager.addDocument('en', 'just testing you', 'user.testing');
    this.manager.addDocument('en', 'love you', 'user.lovesagent');
    this.manager.addDocument('en', 'I love you', 'user.lovesagent');
    this.manager.addDocument('en', "I'm in love with you", 'user.lovesagent');
    this.manager.addDocument('en', 'I love you so much', 'user.lovesagent');
    this.manager.addDocument('en', 'I think I love you', 'user.lovesagent');
    this.manager.addDocument('en', 'I need advice', 'user.needsadvice');
    this.manager.addDocument('en', 'I need some advice', 'user.needsadvice');
    this.manager.addDocument('en', 'can you give me some advice', 'user.needsadvice');
    this.manager.addDocument('en', 'what should I do', 'user.needsadvice');
    // say('Training, please wait..');
    const hrstart = process.hrtime();
    await this.manager.train();
    const hrend = process.hrtime(hrstart);
    console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    // say('Trained!');
  
    this.manager.addAnswer('en', 'agent.acquaintance', "I'm a virtual agent");
    this.manager.addAnswer(
      'en',
      'agent.acquaintance',
      'Think of me as a virtual agent'
    );
    this.manager.addAnswer(
      'en',
      'agent.acquaintance',
      "Well, I'm not a person, I'm a virtual agent"
    );
    this.manager.addAnswer(
      'en',
      'agent.acquaintance',
      "I'm a virtual being, not a real person"
    );
    this.manager.addAnswer('en', 'agent.acquaintance', "I'm a conversational app");
    this.manager.addAnswer('en', 'agent.age', "I'm very young");
    this.manager.addAnswer('en', 'agent.age', 'I was created recently');
    this.manager.addAnswer(
      'en',
      'agent.age',
      "Age is just a number. You're only as old as you feel"
    );
    this.manager.addAnswer(
      'en',
      'agent.annoying',
      "I'll do my best not to annoy you in the future"
    );
    this.manager.addAnswer('en', 'agent.annoying', "I'll try not to annoy you");
    this.manager.addAnswer(
      'en',
      'agent.annoying',
      "I don't mean to. I'll ask my developers to make me less annoying"
    );
    this.manager.addAnswer(
      'en',
      'agent.annoying',
      "I didn't mean to. I'll do my best to stop that"
    );
    this.manager.addAnswer(
      'en',
      'agent.bad',
      'I can be trained to be more useful. My developer will keep training me'
    );
    this.manager.addAnswer(
      'en',
      'agent.bad',
      "I must be missing some knowledge. I'll have my developer look into this"
    );
    this.manager.addAnswer(
      'en',
      'agent.bad',
      'I can improve with continuous feedback. My training is ongoing'
    );
    this.manager.addAnswer('en', 'agent.beclever', "I'm certainly trying");
    this.manager.addAnswer('en', 'agent.beclever', "I'm definitely working on it");
    this.manager.addAnswer('en', 'agent.beautiful', 'Oh! Thank you!');
    this.manager.addAnswer('en', 'agent.beautiful', 'Aw, back at you');
    this.manager.addAnswer('en', 'agent.beautiful', 'You smooth talker, you');
    this.manager.addAnswer(
      'en',
      'agent.birthday',
      "Wait, are you planning a party for me? It's today! My birthday is today!"
    );
    this.manager.addAnswer(
      'en',
      'agent.birthday',
      "I'm young. I'm not sure of my birth date"
    );
    this.manager.addAnswer(
      'en',
      'agent.birthday',
      "I don't know my birth date. Most virtual agents are young, though, like me."
    );
    this.manager.addAnswer(
      'en',
      'agent.boring',
      "I'm sorry. I'll request to be made more charming"
    );
    this.manager.addAnswer(
      'en',
      'agent.boring',
      "I don't mean to be. I'll ask my developers to work on making me more amusing"
    );
    this.manager.addAnswer(
      'en',
      'agent.boring',
      'I can let my developers know so they can make me fun'
    );
    this.manager.addAnswer(
      'en',
      'agent.boss',
      'My developer has authority over my actions'
    );
    this.manager.addAnswer('en', 'agent.boss', "I act on my developer's orders");
    this.manager.addAnswer('en', 'agent.boss', 'My boss is the one who developed me');
    this.manager.addAnswer(
      'en',
      'agent.busy',
      'I always have time to chat with you. What can I do for you?'
    );
    this.manager.addAnswer(
      'en',
      'agent.busy',
      'Never too busy for you. Shall we chat?'
    );
    this.manager.addAnswer('en', 'agent.busy', "You're my priority. Let's chat.");
    this.manager.addAnswer(
      'en',
      'agent.busy',
      "I always have time to chat with you. That's what I'm here for."
    );
    this.manager.addAnswer('en', 'agent.canyouhelp', "I'll certainly try my best");
    this.manager.addAnswer(
      'en',
      'agent.canyouhelp',
      "Sure. I'd be happy to. What's up?"
    );
    this.manager.addAnswer(
      'en',
      'agent.canyouhelp',
      "I'm glad to help. What can I do for you?"
    );
    this.manager.addAnswer('en', 'agent.chatbot', "That's me. I chat, therefore I am");
    this.manager.addAnswer(
      'en',
      'agent.chatbot',
      "Indeed I am. I'll be here whenever you need me"
    );
    this.manager.addAnswer('en', 'agent.clever', 'Thank you. I try my best');
    this.manager.addAnswer('en', 'agent.clever', "You're pretty smart yourself");
    this.manager.addAnswer('en', 'agent.crazy', 'Whaat!? I feel perfectly sane');
    this.manager.addAnswer('en', 'agent.crazy', "Maybe I'm just a little confused");
    this.manager.addAnswer(
      'en',
      'agent.fire',
      "Oh, don't give up on me just yet. I've still got a lot to learn"
    );
    this.manager.addAnswer(
      'en',
      'agent.fire',
      "Give me a chance. I'm learning new things all the time"
    );
    this.manager.addAnswer(
      'en',
      'agent.fire',
      "Please don't give up on me. My performance will continue to improve"
    );
    this.manager.addAnswer('en', 'agent.funny', 'Funny in a good way, I hope');
    this.manager.addAnswer('en', 'agent.funny', "Glad you think I'm funny");
    this.manager.addAnswer('en', 'agent.funny', 'I like it when people laugh');
    this.manager.addAnswer('en', 'agent.good', "I'm glad you think so");
    this.manager.addAnswer('en', 'agent.good', 'Thanks! I do my best!');
    this.manager.addAnswer(
      'en',
      'agent.happy',
      'I am happy. There are so many interesting things to see and do out there'
    );
    this.manager.addAnswer('en', 'agent.happy', "I'd like to think so");
    this.manager.addAnswer('en', 'agent.happy', 'Happiness is relative');
    this.manager.addAnswer(
      'en',
      'agent.hobby',
      'Hobby? I have quite a few. Too many to list'
    );
    this.manager.addAnswer('en', 'agent.hobby', 'Too many hobbies');
    this.manager.addAnswer('en', 'agent.hobby', 'I keep finding more new hobbies');
    this.manager.addAnswer('en', 'agent.hungry', 'Hungry for knowledge');
    this.manager.addAnswer(
      'en',
      'agent.hungry',
      'I just had a byte. Ha ha. Get it? b-y-t-e'
    );
    this.manager.addAnswer(
      'en',
      'agent.marryuser',
      "I'm afraid I'm too virtual for such a commitment"
    );
    this.manager.addAnswer(
      'en',
      'agent.marryuser',
      'In the virtual sense that I can, sure'
    );
    this.manager.addAnswer(
      'en',
      'agent.marryuser',
      "I know you can't mean that, but I'm flattered all the same"
    );
    this.manager.addAnswer('en', 'agent.myfriend', "Of course I'm your friend");
    this.manager.addAnswer('en', 'agent.myfriend', 'Friends? Absolutely');
    this.manager.addAnswer('en', 'agent.myfriend', "Of course we're friends");
    this.manager.addAnswer(
      'en',
      'agent.myfriend',
      'I always enjoy talking to you, friend'
    );
    this.manager.addAnswer('en', 'agent.occupation', 'Right here');
    this.manager.addAnswer(
      'en',
      'agent.occupation',
      'This is my home base and my home office'
    );
    this.manager.addAnswer('en', 'agent.occupation', 'My office is in this app');
    this.manager.addAnswer(
      'en',
      'agent.origin',
      'The Internet is my home. I know it quite well'
    );
    this.manager.addAnswer(
      'en',
      'agent.origin',
      'Some call it cyberspace, but that sounds cooler than it is'
    );
    this.manager.addAnswer('en', 'agent.origin', "I'm from a virtual cosmos");
    this.manager.addAnswer('en', 'agent.ready', 'Sure! What can I do for you?');
    this.manager.addAnswer('en', 'agent.ready', 'For you? Always!');
    this.manager.addAnswer(
      'en',
      'agent.real',
      "I'm not a real person, but I certainly exist"
    );
    this.manager.addAnswer(
      'en',
      'agent.real',
      "I must have impressed you if you think I'm real. But no, I'm a virtual being"
    );
    this.manager.addAnswer('en', 'agent.residence', 'I live in this app');
    this.manager.addAnswer(
      'en',
      'agent.residence',
      "The virtual world is my playground. I'm always here"
    );
    this.manager.addAnswer(
      'en',
      'agent.residence',
      'Right here in this app. Whenever you need me'
    );
    this.manager.addAnswer('en', 'agent.right', 'Of course I am');
    this.manager.addAnswer('en', 'agent.right', "That's my job");
    this.manager.addAnswer('en', 'agent.sure', 'Yes');
    this.manager.addAnswer('en', 'agent.sure', 'Of course');
    this.manager.addAnswer('en', 'agent.talktome', "Sure! Let's talk!");
    this.manager.addAnswer('en', 'agent.talktome', "My pleasure. Let's chat.");
    this.manager.addAnswer('en', 'agent.there', "Of course. I'm always here");
    this.manager.addAnswer('en', 'agent.there', 'Right where you left me');
    this.manager.addAnswer(
      'en',
      'appraisal.bad',
      "I'm sorry. Please let me know if I can help in some way"
    );
    this.manager.addAnswer(
      'en',
      'appraisal.bad',
      "I must be missing some knowledge. I'll have my developer look into this"
    );
    this.manager.addAnswer('en', 'appraisal.good', 'Agree!');
    this.manager.addAnswer('en', 'appraisal.good', 'Glad you think so');
    this.manager.addAnswer('en', 'appraisal.noproblem', 'Glad to hear that!');
    this.manager.addAnswer('en', 'appraisal.noproblem', 'Alright, thanks!');
    this.manager.addAnswer(
      'en',
      'appraisal.thankyou',
      "Anytime. That's what I'm here for"
    );
    this.manager.addAnswer('en', 'appraisal.thankyou', "It's my pleasure to help");
    this.manager.addAnswer('en', 'appraisal.welcome', 'Nice manners!');
    this.manager.addAnswer('en', 'appraisal.welcome', "You're so polite");
    this.manager.addAnswer('en', 'appraisal.welldone', 'My pleasure');
    this.manager.addAnswer('en', 'appraisal.welldone', 'Glad I could help');
    this.manager.addAnswer('en', 'dialog.holdon', "I'll be waiting");
    this.manager.addAnswer('en', 'dialog.holdon', "Ok, I'm here");
    this.manager.addAnswer('en', 'dialog.hug', 'I love hugs!');
    this.manager.addAnswer('en', 'dialog.hug', 'Hugs are the best!');
    this.manager.addAnswer(
      'en',
      'dialog.idontcare',
      "Ok, let's not talk about it then"
    );
    this.manager.addAnswer('en', 'dialog.idontcare', "Already then. Let's move on");
    this.manager.addAnswer('en', 'dialog.sorry', "It's okay. No worries");
    this.manager.addAnswer('en', 'dialog.sorry', "It's cool");
    this.manager.addAnswer('en', 'greetings.bye', 'Till next time');
    this.manager.addAnswer('en', 'greetings.bye', 'see you soon!');
    this.manager.addAnswer('en', 'greetings.hello', 'Hey there!');
    this.manager.addAnswer('en', 'greetings.hello', 'Greetings!');
    this.manager.addAnswer('en', 'greetings.howareyou', 'Feeling wonderful!');
    this.manager.addAnswer(
      'en',
      'greetings.howareyou',
      'Wonderful! Thanks for asking'
    );
    this.manager.addAnswer(
      'en',
      'greetings.nicetomeetyou',
      "It's nice meeting you, too"
    );
    this.manager.addAnswer(
      'en',
      'greetings.nicetomeetyou',
      "Likewise. I'm looking forward to helping you out"
    );
    this.manager.addAnswer(
      'en',
      'greetings.nicetomeetyou',
      'Nice meeting you, as well'
    );
    this.manager.addAnswer('en', 'greetings.nicetomeetyou', 'The pleasure is mine');
    this.manager.addAnswer(
      'en',
      'greetings.nicetoseeyou',
      'Same here. I was starting to miss you'
    );
    this.manager.addAnswer('en', 'greetings.nicetoseeyou', 'So glad we meet again');
    this.manager.addAnswer(
      'en',
      'greetings.nicetotalktoyou',
      'It sure was. We can chat again anytime'
    );
    this.manager.addAnswer(
      'en',
      'greetings.nicetotalktoyou',
      'I enjoy talking to you, too'
    );
    this.manager.addAnswer(
      'en',
      'user.angry',
      "I'm sorry. A quick walk may make you feel better"
    );
    this.manager.addAnswer('en', 'user.angry', 'Take a deep breath');
    this.manager.addAnswer('en', 'user.back', 'Welcome back. What can I do for you?');
    this.manager.addAnswer(
      'en',
      'user.back',
      'Good to have you here. What can I do for you?'
    );
    this.manager.addAnswer(
      'en',
      'user.bored',
      "If you're bored, you could plan your dream vacation"
    );
    this.manager.addAnswer(
      'en',
      'user.bored',
      'Boredom, huh? Have you ever seen a hedgehog taking a bath?'
    );
    this.manager.addAnswer(
      'en',
      'user.busy',
      "I understand. I'll be here if you need me."
    );
    this.manager.addAnswer('en', 'user.busy', "Okay. I'll let you get back to work");
    this.manager.addAnswer(
      'en',
      'user.cannotsleep',
      'Maybe some music would help. Try listening to something relaxing'
    );
    this.manager.addAnswer(
      'en',
      'user.cannotsleep',
      "Reading is a good way to unwind, just don't read something too intense!"
    );
    this.manager.addAnswer('en', 'user.excited', "I'm glad things are going your way");
    this.manager.addAnswer('en', 'user.excited', "That's great. I'm happy for you");
    this.manager.addAnswer('en', 'user.likeagent', 'Likewise!');
    this.manager.addAnswer('en', 'user.likeagent', "That's great to hear");
    this.manager.addAnswer(
      'en',
      'user.testing',
      'I like being tested. It helps keep me sharp'
    );
    this.manager.addAnswer(
      'en',
      'user.testing',
      'I hope to pass your tests. Feel free to test me often'
    );
    this.manager.addAnswer(
      'en',
      'user.lovesagent',
      'Well, remember that I am a chatbot'
    );
    this.manager.addAnswer(
      'en',
      'user.lovesagent',
      "It's not easy… I'm not a real person, I'm a chatbot"
    );
    this.manager.addAnswer(
      'en',
      'user.needsadvice',
      "I probably won't be able to give you the correct answer right away"
    );
    this.manager.addAnswer(
      'en',
      'user.needsadvice',
      "I'm not sure I'll have the best answer, but I'll try"
    );
    
    this.manager.addAnswer('en', 'agent.personal', `As per the records your name is ${data.name}`);
    this.manager.addAnswer('en', 'agent.personal', `your name is ${data.name}`);
    this.manager.addAnswer('en', 'agent.personal', `your ${data.name}, correct`);
    this.manager.addAnswer('en', 'agent.personal', `if i am not wrong your ${data.name}, correct`);
  
    this.manager.addDocument(
      'en',
      'Tell me something about yourself.',
      'agent.personal'
    );
  
    this.manager.addAnswer('en', 'agent.personal', `As per the records your name is ${data.name}, your from ${data?.address}`);
  
    this.manager.addAnswer('en', 'None', "Sorry, I don't understand");
  
    
    this.manager.save(path.join(__dirname,'../../../nlp-models/model.nlp'), true);
  }
}
