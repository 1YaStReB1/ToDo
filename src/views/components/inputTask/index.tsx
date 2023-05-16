import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMod] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
   if(isEditMode){
    editTitleInputRef?.current?.focus();
   }
  
  }, [isEditMode])
  

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
             // onDone(id);
            }
          }}
        />
        {isEditMode ? (
          <input
          ref = {editTitleInputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={styles.inputTaskEditTitle}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                onEdited(id,value);
              setIsEditMod(false)
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
          
              onEdited(id,value);
              setIsEditMod(false)
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMod(true);
          }}
        />
      )}

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          onRemoved(id);
          
        }}
      />
    </div>
  );
};
