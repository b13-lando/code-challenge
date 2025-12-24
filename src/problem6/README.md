# High level flow diagrams
[Mermaid Diagram](https://mermaid.live/edit#pako:eNqVVVtP2zAU_iuWpUmb1AJpeiMPm0o7LhtQKCC0pX0wyWnjkdiZ45R1Ff99J7ZbUsSkLS_x5fvO-c4tWdNIxkADOk_lU5QwpcntaCoIPu_ekZtIKiB3ecw0kGNE2JtBeFeAIpHM8hQ0FIQJwiLNpZiRZvMjOQqPlRQaRExiXuRMRwmCBldnJGJpSrQk-0Vleb80lmfW6pHhDsMKdwNqySMgS5byCoIuSp3cykcQiN7qG-eVU5aSgZAZS1dkhHKMELRg3hY6NKZHXthsNrek4A0W3js1I89yWuEtz4AMFiA0wTiix4KkcsHFfhXxkusVwQA1KPGK6IfnMmLG6g55LhUpRVmUKDt1iFfUdjgCE_4OMbZncy4WoHLFhX5F64RHkLAlRwc7RFuamkxHa1ladz3AorCKgdg8V3IJn54dxncYt23vbjvbrTvo4gG5lOb4OJzAD8wrUfCzhEKTuISq9sxmfVanfMMKV5yT8F5x7DXTHsS2R8XBN3tgBRCmZcarLlpt4zgxzNPQtekEsOew0TB4k-tbmRPvwLZy4ZyeGspZOKwSRPgcXRhQwpCZMExw7JBndXVfwiMlWRwxDEbA04a15Izcw8ONjB5B13kuEV_DkSRC6gQrN6trPscM6VIJY8yGjLGWOFv1JncBIFRxwIGoDeKFHUSX4GIDNaYeJFOxncfLf51HDMgJvDTE8c4wohNUUPwlw444NsSr9dBcJ1xvWumqnsnrTeRO8VzJbMcuapo7zbMa32V0El6jltVLW9QKXdQLPfn_3pi8KXBXz7Y21mDVNTLLcMaMaXtblA8LxfLEYsIptVibl_c7nj9MqXNumvNlObZLdDoVtEEzUBnjMX6t19XFlOoEMpjSAJcxU49TOhXPiMNvpbxZiYgGWpXQoEqWi4QGc5YWuLNTNeIM5WXb05yJ71JmG4oFfY65lqqOocGa_qJBs9fy9vq9drftHfjttt_vNeiKBl5nr9P3O1778NDv-t5B77lBfxur3l6332q1O37P77U6_UPPa1Aw1i_s_8f8hhp0oar4nGyMG9RQlkLToNs67D__AR42Fg4)



# Backend Implementation Tickets for Scoreboard Module

This section breaks down the implementation of the Scoreboard API module into actionable tickets for backend engineers.

---

## Ticket 1: Implement User Score Update API

**Title:** `POST https://<backend-domain>/api/score` – Create User Score  

**Description:**  
Implement an API endpoint to securely create a user’s score when they complete an action. The API must validate the user, prevent duplicate scoring for the same action, write the new score to the database, update the Redis cache, and broadcast updates if the top 10 changes.  

**Acceptance Criteria:**  
- API validates `authToken` and returns 401 if invalid.  
- API checks if `actionId` was already scored for the user; rejects duplicates.  
- Score updates are atomic in the database.  
- Redis cache for top 10 scores is updated after a valid score change.  
- If the top 10 changes, a WebSocket broadcast is sent to connected clients.  
- API returns the new user score on success.  


---

## Ticket 2: Implement Redis Cache for Top 10 Scores

**Title:** Redis Cache Component for Top 10 Leaderboard  

**Description:**  
Implement a Redis cache to store the top 10 scores for fast retrieval. This cache should be updated whenever a user’s score changes and be used for all leaderboard queries to reduce database load.  

**Acceptance Criteria:**  
- Redis key structure and TTL are defined.  
- Update Redis when a user’s score changes.  
- Retrieve top 10 scores from Redis for leaderboard queries.  
- On cache miss, query database and refresh Redis.  
- Ensure Redis is thread-safe and handles concurrent updates correctly.  

---

## Ticket 3: Implement WebSocket Broadcast for Live Leaderboard

**Title:** WebSocket Integration for Live Top 10 Updates  

**Description:**  
Implement WebSocket connections wss://<backend-domain>/ws/leaderboard
 to push live updates to frontend clients whenever the top 10 leaderboard changes. The broadcast should include the latest top 10 scores in a consistent JSON format.  

**Acceptance Criteria:**  
- WebSocket server can accept multiple client connections.  
- Broadcasts are sent only if top 10 leaderboard changes.  
- Message format is standardized.  
- Ensure connection errors are logged and handled gracefully.


---

## Ticket 4: Design and Implement UserScore Database Schema

**Title:** Database Schema for User Scores  

**Description:**  
Design and implement the database schema to store user scores and track completed actions to prevent duplicate scoring.

**Acceptance Criteria:**  
- Table `UserScore` with fields:
  - `userId` (Primary Key)  
  - `score` (Integer)  

- Atomic operations for score updates.  
- Indexed for fast retrieval of top scores.  
- Optional: Add `created`/`updated` timestamps for auditing.



---

## Ticket 5: Implement Top 10 Score Retrieval API

**Title:** GET `https://<backend-domain>/api/score/top` – Top 10 Leaderboard  

**Description:**  
Implement an API endpoint to return the top 10 scores. The API should first check Redis cache, and on a miss, query the database and refresh the cache.

**Acceptance Criteria:**  
- API returns top 10 scores sorted by score descending.  
- Redis cache is checked first; database queried only on cache miss.  
- API response format:
```json
{
  "topScores": [
    { "userId": "user1", "score": 2000 },
    { "userId": "user2", "score": 1950 }
    // ...
  ]
}

## Ticket 6: Anomaly Detection to validate user score action

This will be a major topic developed using python and Isolation Forest. Can be discussed in the call if the interviewers are interested in
