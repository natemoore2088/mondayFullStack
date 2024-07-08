import { useCallback } from 'react';
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

const useMondayService = () => {
  const createOrder = useCallback(async (boardId, itemName, columnValues, fragrances) => {
    try {
      // Create the item without the dropdown value
      const createItemResponse = await monday.api(`
        mutation {
          create_item (
            board_id: ${boardId}, 
            item_name: "${itemName}",
            column_values: ${JSON.stringify(JSON.stringify(columnValues))}
          ) {
            id
          }
        }
      `);

      const newItemId = createItemResponse.data.create_item.id;

      // Update the dropdown value
      const fragranceLabels = fragrances.join(',');
      await monday.api(`
        mutation {
          change_simple_column_value (
            item_id: ${newItemId}, 
            board_id: ${boardId}, 
            column_id: "dropdown", 
            value: "${fragranceLabels}",
            create_labels_if_missing: true
          ) {
            id
          }
        }
      `);

      return newItemId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }, []);

  return { createOrder };
};

export default useMondayService;