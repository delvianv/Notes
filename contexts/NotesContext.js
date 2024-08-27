import { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const IS_DEV = false;

const DATA = [
  {
    id: 1,
    title: "pulvinar sed",
    content:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
  },
  {
    id: 2,
    title: "in tempor turpis",
    content: "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
  },
  {
    id: 3,
    title: "morbi porttitor",
    content:
      "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 4,
    title: "erat fermentum justo",
    content:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 5,
    title: "porttitor lacus",
    content:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
  },
  {
    id: 6,
    title: "duis at velit eu est",
    content: "Morbi a ipsum. Integer a nibh. In quis justo.",
  },
  {
    id: 7,
    title: "vitae nisi nam ultrices",
    content:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.",
  },
  {
    id: 8,
    title: "natoque penatibus et magnis dis",
    content:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
  },
  { id: 9, title: "integer pede justo lacinia", content: "In quis justo." },
  {
    id: 10,
    title: "sollicitudin vitae consectetuer eget",
    content:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
  },
  {
    id: 11,
    title: "ultrices libero",
    content:
      "Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.",
  },
  {
    id: 12,
    title: "morbi",
    content:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
  },
  {
    id: 13,
    title: "eros viverra eget congue eget",
    content:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
  },
  {
    id: 14,
    title: "auctor sed",
    content:
      "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  },
  {
    id: 15,
    title: "a odio in",
    content:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  },
  {
    id: 16,
    title: "ultrices enim lorem ipsum dolor",
    content:
      "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    id: 17,
    title: "turpis nec euismod",
    content:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
  },
  {
    id: 18,
    title: "fusce consequat",
    content: "Phasellus id sapien in sapien iaculis congue.",
  },
  {
    id: 19,
    title: "elit proin risus praesent",
    content:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
  },
  {
    id: 20,
    title: "felis fusce posuere felis sed",
    content: "Morbi a ipsum. Integer a nibh.",
  },
];

function notesReducer(notes, action) {
  switch (action.type) {
    case "load": {
      return action.notes;
    }
    case "new": {
      const data = [
        { id: Date.now(), title: action.title, content: action.content },
        ...notes,
      ];

      storeData(data);
      return data;
    }
    case "edit": {
      const data = notes.map((note) =>
        note.id == action.id
          ? { id: action.id, title: action.title, content: action.content }
          : note
      );

      storeData(data);
      return data;
    }
    case "delete": {
      const data = notes.filter((note) => note.id != action.id);

      storeData(data);
      return data;
    }
  }
}

export const NotesContext = createContext();
export const NotesDispatchContext = createContext();

export function NotesProvider({ children }) {
  const [notes, dispatchNotes] = useReducer(notesReducer, IS_DEV ? DATA : []);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatchNotes}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}

const storeData = async (data) => {
  if (IS_DEV) return;

  try {
    await AsyncStorage.setItem("notes", JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
