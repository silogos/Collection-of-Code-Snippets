import wait from "./utils/wait.js";

export default function autoDeleteConversationFacebook() {
  const listChat = document.querySelector('[aria-label="Chats"]').children[0]
    .children[0].children[0];

  if (!listChat) {
    throw new Error("List chat not found");
  }

  let countTry = 0;
  async function deleteConversation() {
    try {
      const firstChat = listChat.children[1].children[0].children[0];
      if (!firstChat) throw new Error("Failed to get first chat");
      firstChat.querySelector('[aria-label="Menu"]').click();

      await wait();
      const menuItemDelete = (a = [
        ...document.querySelectorAll('[role="menuitem"]'),
      ].find((el) => {
        return el.children[1].innerText === "Delete chat";
      }));
      if (!menuItemDelete) throw new Error("Failed to get menuItemDelete");
      menuItemDelete.click();

      await wait();
      const buttonConfirmDelete = document.querySelectorAll(
        '[aria-label="Delete chat"][role="button"]'
      )[1];
      if (!buttonConfirmDelete)
        throw new Error("Failed to get button confirm delete");
      buttonConfirmDelete.click();

      await wait();
      countTry = 0;
      deleteConversation();
    } catch (error) {
      countTry += 1;

      if (countTry > 3) {
        return false;
      }

      await wait();
      deleteConversation();
    }
  }

  deleteConversation();
}

autoDeleteConversationFacebook();
