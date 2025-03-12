const { Pool } = require('pg');
import express from 'express';
import dbconnection from './dbconnection';

const pool = new Pool(dbconnection);
