import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { getMedicalConversation } from './getMedicalConversation/resource';
import { comprehendMedical } from './comprehendMedical/resource';
defineBackend({
  auth,
  data,
  getMedicalConversation,
  comprehendMedical,
});
