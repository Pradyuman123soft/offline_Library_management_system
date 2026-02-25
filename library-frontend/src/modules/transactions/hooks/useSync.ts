import { useEffect } from "react";
import { dbPromise } from "./../../../lib/db";

export const useSync = () => {
  useEffect(() => {
    const syncData = async () => {
      if (!navigator.onLine) return;

      const db = await dbPromise;

      const allQueueItems = await db.getAll("syncQueue");

      for (const item of allQueueItems) {
        try {
          await fetch("YOUR_LARAVEL_API_ENDPOINT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: item.type,
              payload: item.payload,
            }),
          });

          // ✅ Remove item after successful sync
          await db.delete("syncQueue", item.queueId);
        } catch (error) {
          console.error("Sync failed for item:", item, error);
        }
      }
    };

    // Run when app starts
    syncData();

    // Run when connection comes back
    window.addEventListener("online", syncData);

    return () => {
      window.removeEventListener("online", syncData);
    };
  }, []);
};