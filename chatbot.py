def get_response(user_input):
    user_input = user_input.lower()
    if "hello" in user_input or "hi" in user_input:
        return "Hello! How can I help you today?"
    elif "how are you" in user_input:
        return "I'm doing well, thank you! How about you?"
    elif "bye" in user_input or "goodbye" in user_input:
        return "Goodbye! Have a great day!"
    elif "name" in user_input:
        return "I'm your personal chatbot. What's your name?"
    else:
        return "I'm sorry, I didn't understand that. Can you try again?"

def main():
    print("Welcome to your personal chatbot! Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "quit":
            print("Bot: Goodbye!")
            break
        response = get_response(user_input)
        print("Bot:", response)

if __name__ == "__main__":
    main()
