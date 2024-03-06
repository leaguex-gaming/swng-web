"use client";

const KEY = "ju84hjdniw";

const BROADCAST_BASE_URL = `https://cricket-api.leaguex.com`;

export const GET_MATCHES = `${BROADCAST_BASE_URL}/schedule/matches?key=${KEY}`;
export const GET_MATCH_DETAILS = `${BROADCAST_BASE_URL}/schedule/live-score?key=${KEY}&match_id=`;
// https://cricket-api.leaguex.com/schedule/matches?key=ju84hjdniw
