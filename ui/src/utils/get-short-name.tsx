interface INameProps {
  firstName: string;
  lastName: string;
}

export const getShortName = ({ firstName, lastName }: INameProps): string => {
  const fName = firstName.at(0);
  const lName = lastName.at(0);

  return `${fName}${lName}`;
};
