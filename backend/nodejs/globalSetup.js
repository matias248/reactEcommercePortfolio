import { LocalApp } from './localserver.js'
import supertest from 'supertest'

export default function setup() {
global.api =  supertest(LocalApp());
}
